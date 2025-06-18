// app/api/student-subjects/route.ts
import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function POST(req: NextRequest) {
  try {
    const { studentId } = await req.json();

    const subjects = await sql`
      SELECT DISTINCT subject
      FROM exams
      WHERE student_id = ${studentId}
    `;

    return NextResponse.json(subjects);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch subjects' }, { status: 500 });
  }
}
