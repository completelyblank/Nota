import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get('id');

  if (!studentId) {
    return NextResponse.json({ error: 'Missing student ID' }, { status: 400 });
  }

  try {
    const results = await sql`
      SELECT subject, marks, comment, uploaded_at
      FROM exams
      WHERE student_id = ${studentId}
      ORDER BY uploaded_at DESC
    `;

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching student marks:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
