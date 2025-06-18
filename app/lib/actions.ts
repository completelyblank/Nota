// This file is server-only (no 'use client')
import postgres from 'postgres';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchDashboardData() {
  const result = await sql<[{ student_count: number; teacher_count: number }]>`
    SELECT 
      COUNT(*) FILTER (WHERE role = 'student') AS student_count,
      COUNT(*) FILTER (WHERE role = 'teacher') AS teacher_count
    FROM users
  `;

  return {
    studentsCount: result[0].student_count,
    teachersCount: result[0].teacher_count,
  };
}

// Fetch student-specific dashboard data
export async function fetchStudentDashboardData(studentId: string) {
  const [gpaResult, commentsResult] = await Promise.all([
    sql<{ avg: number }[]>`
      SELECT AVG(gpa)::float AS avg
      FROM exams
      WHERE student_id = ${studentId}
    `,
    sql<{ comment: string }[]>`
      SELECT comment
      FROM exams
      WHERE student_id = ${studentId}
      ORDER BY uploaded_at DESC
      LIMIT 5
    `,
  ]);

  return {
    gpa: parseFloat(gpaResult[0]?.avg?.toFixed(2)) || 0,
    comments: commentsResult.map(c => c.comment),
  };
}

// Fetch teacher-specific dashboard data
export async function fetchTeacherDashboardData(teacherId: string) {
  const [studentsResult, uploadsResult] = await Promise.all([
    sql<{ count: number }[]>`
      SELECT COUNT(DISTINCT student_id) AS count
      FROM exams
      WHERE teacher_id = ${teacherId}
    `,
    sql<{ pdf_url: string; subject: string; student_id: string }[]>`
      SELECT pdf_url, subject, student_id
      FROM exams
      WHERE teacher_id = ${teacherId}
      ORDER BY uploaded_at DESC
      LIMIT 10
    `,
  ]);

  

  return {
    studentsCount: studentsResult[0]?.count || 0,
    uploadedFiles: uploadsResult.map((file, idx) => ({
      name: `Student ${file.student_id} - ${file.subject}`,
      url: file.pdf_url,
    })),
  };
}
