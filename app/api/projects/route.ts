import { NextRequest, NextResponse } from 'next/server';
import { SEED_PROJECTS } from '@/lib/data/fieldwork-seeds';
import { db } from '@/lib/db';
import { languageProjects } from '@/lib/db/schema';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const region = searchParams.get('region');

    let projects = [...SEED_PROJECTS];

    // Attempt DB query if configured
    if (db && process.env.DATABASE_URL) {
      try {
        const dbProjects = await db.select().from(languageProjects);
        if (dbProjects.length > 0) {
          // Merge or supplement
        }
      } catch (err) {
        console.warn('Fallback to seed projects:', err);
      }
    }

    if (region && region !== 'all') {
      projects = projects.filter(p => p.region.toLowerCase().includes(region.toLowerCase()));
    }

    return NextResponse.json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, region, problemStatement, goal, scope, proposerName } = body;

    if (!name || !problemStatement || !goal) {
      return NextResponse.json(
        { success: false, error: 'Name, problem statement, and goal are required.' },
        { status: 400 }
      );
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newProject = {
      id: `proj_${Date.now()}`,
      slug,
      name,
      hindiName: body.hindiName || name,
      region: region || 'South Asia',
      status: 'submitted' as const,
      scope: scope || 'both',
      problemStatement,
      goal,
      summary: body.summary || problemStatement.slice(0, 160) + '...',
      proposer: {
        name: proposerName || 'Field Researcher',
        role: 'Community Field Coordinator',
        avatarUrl: '/avatars/default.png',
      },
      totalParticipants: 1,
      totalQuestsCompleted: 0,
      candidateOrthographies: body.candidateOrthographies || [],
      communityMirror: {
        totalResponses: 0,
        consensusStatus: 'exploratory' as const,
        distribution: [],
        cohorts: [],
      },
      sampleStimuli: [],
    };

    // If database is available, persist
    if (db && process.env.DATABASE_URL) {
      try {
        await db.insert(languageProjects).values({
          slug,
          name,
          broadRegionLabel: region,
          problemStatement,
          goal,
          scope: scope || 'word',
          proposerId: body.proposerId || 'user_demo',
          status: 'submitted',
        });
      } catch (dbErr) {
        console.warn('DB insert skipped:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      project: newProject,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
