// app/api/get-students/route.ts
import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    const results = await sql`
      SELECT 
        u.id, 
        u.name, 
        (
          SELECT e.marks 
          FROM exams e
          WHERE e.student_id = u.id
          ORDER BY e.uploaded_at DESC
          LIMIT 1
        ) AS latest_marks
      FROM users u
      WHERE u.role = 'student'
    `;

    return NextResponse.json({ students: results });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}
