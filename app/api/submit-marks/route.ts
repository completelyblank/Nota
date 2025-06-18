// app/api/submit-marks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function POST(req: NextRequest) {
  try {
    const { studentId, teacherId, subject, marks, comment } = await req.json();

    if (!studentId || !teacherId || !subject || marks == null) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const exam = await sql`
      SELECT id FROM exams
      WHERE student_id = ${studentId}
        AND teacher_id = ${teacherId}
        AND subject = ${subject}
      ORDER BY uploaded_at DESC
      LIMIT 1
    `;

    if (!exam.length) {
      return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
    }

    const examId = exam[0].id;

    await sql`
      UPDATE exams
      SET marks = ${marks}, comment = ${comment || ''}
      WHERE id = ${examId}::uuid
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating marks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
