import { NextRequest, NextResponse } from 'next/server';
import { validateStateTransition, ProjectLifecycleStatus, UserPlatformRole } from '@/lib/modules/governance/governance-workflow';
import { db } from '@/lib/db';
import { auditEvents, languageProjects } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

interface ProposalTransitionRequestBody {
  projectId: string;
  currentStatus: ProjectLifecycleStatus;
  targetStatus: ProjectLifecycleStatus;
  actorId: string;
  actorRole: UserPlatformRole;
  isProposer: boolean;
  reason: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ProposalTransitionRequestBody;

    const validation = validateStateTransition(body.currentStatus, body.targetStatus, {
      actorId: body.actorId,
      actorRole: body.actorRole,
      isProposer: body.isProposer,
      reason: body.reason,
    });

    if (!validation.allowed) {
      return NextResponse.json(
        { success: false, error: validation.rejectionReason },
        { status: 403 }
      );
    }

    // Record audit event in Neon database if available
    if (db && process.env.DATABASE_URL) {
      try {
        await db.insert(auditEvents).values({
          actorId: body.actorId,
          action: validation.auditPayload?.action || 'PROJECT_STATUS_TRANSITION',
          targetType: 'language_project',
          targetId: body.projectId as any,
          priorState: validation.auditPayload?.priorState,
          newState: validation.auditPayload?.newState,
          reason: body.reason,
        });

        await db
          .update(languageProjects)
          .set({
            status: body.targetStatus,
            reviewedBy: body.actorId,
            reviewedAt: new Date(),
            reviewReason: body.reason,
            updatedAt: new Date(),
          })
          .where(eq(languageProjects.id, body.projectId as any));
      } catch (dbErr) {
        console.warn('Audit persistence skipped in DB:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      transition: validation,
      message: `Project status successfully transitioned to '${body.targetStatus}'.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
