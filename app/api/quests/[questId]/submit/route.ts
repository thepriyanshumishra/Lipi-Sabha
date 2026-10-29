import { NextRequest, NextResponse } from 'next/server';
import { summarizeQuestSession, QuestItemEvaluationOutput } from '@/lib/modules/quest/quest-engine';
import { db } from '@/lib/db';
import { profiles, questAttempts, responses, xpLedger } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

interface QuestSubmitRequestBody {
  userId?: string;
  itemResults: QuestItemEvaluationOutput[];
  timeSpentSeconds?: number;
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ questId: string }> }
) {
  try {
    const { questId } = await context.params;
    const body = (await req.json()) as QuestSubmitRequestBody;

    const userId = body.userId || 'guest_scribe';
    const itemResults = body.itemResults || [];
    const timeSpentSeconds = body.timeSpentSeconds || 60;

    let userProfile: {
      totalXp: number;
      currentStreak: number;
      longestStreak: number;
      streakFreezesAvailable: number;
      lastQuestCompletedAt: Date | null;
    } = {
      totalXp: 120,
      currentStreak: 2,
      longestStreak: 4,
      streakFreezesAvailable: 1,
      lastQuestCompletedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    };

    // If database connection is active, query real profile
    if (db && process.env.DATABASE_URL) {
      try {
        const found = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);
        if (found.length > 0) {
          userProfile = {
            totalXp: found[0].totalXp,
            currentStreak: found[0].currentStreak,
            longestStreak: found[0].longestStreak,
            streakFreezesAvailable: found[0].streakFreezesAvailable,
            lastQuestCompletedAt: found[0].lastQuestCompletedAt,
          };
        }
      } catch (dbErr) {
        console.warn('Database query bypassed, utilizing in-memory profile:', dbErr);
      }
    }

    // Process summary through QuestEngine
    const summary = summarizeQuestSession(itemResults, userProfile);

    // If database is available, record attempt and update profile
    if (db && process.env.DATABASE_URL) {
      try {
        // Record quest attempt
        const [attempt] = await db
          .insert(questAttempts)
          .values({
            questId: questId as any,
            userId,
            timeSpentSeconds,
            completedAt: new Date(),
          })
          .returning();

        // Record XP transaction
        if (summary.totalXpEarned > 0) {
          await db.insert(xpLedger).values({
            userId,
            eventType: 'quest_completion',
            referenceId: `attempt_${attempt?.id || questId}_${Date.now()}`,
            xpAmount: summary.totalXpEarned,
          });

          // Update user profile
          await db
            .update(profiles)
            .set({
              totalXp: userProfile.totalXp + summary.totalXpEarned,
              currentStreak: summary.newStreak,
              longestStreak: Math.max(userProfile.longestStreak, summary.newStreak),
              streakFreezesAvailable: summary.earnedNewFreeze
                ? userProfile.streakFreezesAvailable + 1
                : userProfile.streakFreezesAvailable,
              lastQuestCompletedAt: new Date(),
              scribeRank: summary.currentRank.name,
              updatedAt: new Date(),
            })
            .where(eq(profiles.userId, userId));
        }
      } catch (persistErr) {
        console.warn('Database persistence skipped:', persistErr);
      }
    }

    return NextResponse.json({
      success: true,
      questId,
      summary,
    });
  } catch (error: any) {
    console.error('Error submitting quest:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
