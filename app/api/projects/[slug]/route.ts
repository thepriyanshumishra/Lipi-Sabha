import { NextRequest, NextResponse } from 'next/server';
import { SEED_PROJECTS } from '@/lib/data/fieldwork-seeds';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const project = SEED_PROJECTS.find(p => p.slug === slug);

    if (!project) {
      return NextResponse.json(
        { success: false, error: `Project '${slug}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
