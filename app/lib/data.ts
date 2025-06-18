'use server';
import postgres from 'postgres';
import { createClient } from '@supabase/supabase-js';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getUserRole(userId: string): Promise<'student' | 'teacher' | null> {
  try {
    const data = await sql<{ role: 'student' | 'teacher' }[]>`
      SELECT role FROM users WHERE id = ${sql`${userId}::uuid`}
    `;
    return data[0]?.role ?? null;
  } catch (err) {
    console.error('Error getting user role:', err);
    return null;
  }
}

export async function fetchStudentDashboardData(userId: string) {
  try {
    const data = await sql<{ comment: string; answer: string }[]>`
      SELECT comment, answer FROM exams
      WHERE student_id = ${sql`${userId}::uuid`}
      ORDER BY uploaded_at DESC
      LIMIT 5
    `;

    const comments = data.map((e) => e.comment);
    const answers = data.map((e) => e.answer);
    return { comments, answers };
  } catch (err) {
    console.error('Error fetching student dashboard data:', err);
    throw new Error('Failed to fetch student dashboard data');
  }
}

export async function getUserInfo() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('Unauthorized');
  }

  const name = user.user_metadata?.name ?? 'No Name';
  const email = user.email ?? 'no-email@example.com';

  const existingUser = await sql`
    SELECT * FROM users WHERE id = ${user.id}
  `;

  if (existingUser.length === 0) {
    await sql`
      INSERT INTO users (id, email, name, password, role)
      VALUES (${user.id}::uuid, ${email}, ${name}, NULL, 'student')
    `;
  }

  const role = await getUserRole(user.id);
  const displayName = await getUserName(user.id);

  if (!role || !displayName) throw new Error('Missing role or name');

  return { id: user.id, role, name: displayName };
}

export async function getUserName(userId: string): Promise<string | null> {
  try {
    const data = await sql<{ name: string }[]>`
      SELECT name FROM users WHERE id = ${sql`${userId}::uuid`}
    `;
    return data[0]?.name ?? null;
  } catch (err) {
    console.error('Error getting user name:', err);
    return null;
  }
}

export async function fetchTeacherDashboardData() {
  try {
    const students = await sql<{ count: number }[]>`
      SELECT COUNT(*)::int AS count FROM users WHERE role = 'student'
    `;
    return {
      studentsCount: students[0]?.count || 0,
    };
  } catch (err) {
    console.error('Error fetching teacher dashboard data:', err);
    throw new Error('Failed to fetch teacher dashboard data');
  }
}

export async function submitAnswer({
  studentId,
  teacherId,
  subject,
  answer,
}: {
  studentId: string;
  teacherId: string;
  subject: string;
  answer: string;
}) {
  if (!studentId || !teacherId || !subject || !answer) {
    throw new Error('One or more required values are undefined');
  }

  try {
    await sql`
      INSERT INTO exams (
        student_id, teacher_id, subject, marks, comment, answer, uploaded_at
      )
      VALUES (
        ${studentId}::uuid,
        ${teacherId}::uuid,
        ${subject},
        0,
        'nothing',
        ${answer},
        NOW()
      )
    `;
  } catch (err) {
    console.error('Error inserting answer:', err);
    throw new Error('Failed to submit answer');
  }
}

// SAFE: Updates marks and comment
export async function submitMarks({
  examId,
  marks,
  comment,
}: {
  examId: string;
  marks: number;
  comment: string;
}) {
  if (!examId || marks === undefined || comment === undefined) {
    throw new Error('Missing parameters for submitMarks');
  }

  try {
    await sql`
      UPDATE exams
      SET marks = ${marks}, comment = ${comment}
      WHERE id = ${examId}::uuid
    `;
  } catch (err) {
    console.error('Error updating marks:', err);
    throw new Error('Failed to update marks');
  }
}


export async function getDefaultTeacherId() {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('role', 'teacher')
    .order('created_at', { ascending: true })
    .limit(1);

  if (error || !data || data.length === 0 || !data[0].id) return null;
  return data[0].id;
}


// ✅ This is the correct function for API
export async function addExam({
  studentId,
  teacherId,
  subject,
  marks,
  comment,
  answer
}: {
  studentId: string;
  teacherId: string;
  subject: string;
  marks: number;
  comment: string;
  answer?: string;
}) {
  try {
    await sql`
      INSERT INTO exams (student_id, teacher_id, subject, marks, comment, answer, uploaded_at)
      VALUES (${studentId}, ${teacherId}, ${subject}, ${marks}, ${comment}, ${answer || null}, NOW())
    `;
    return { success: true };
  } catch (err) {
    console.error('Error adding exam:', err);
    throw new Error('Failed to add exam');
  }
}

export async function fetchStudentMarks(studentId: string) {
  const rows = await sql`
    SELECT subject, marks, comment, uploaded_at
    FROM exams
    WHERE student_id = ${studentId}
    ORDER BY uploaded_at DESC
  `;
  return rows;
}

export async function gradeSubmission({
  examId,
  marks,
  comment,
}: {
  examId: string;
  marks: number;
  comment: string;
}) {
  try {
    await sql`
      UPDATE exams
      SET marks = ${marks}, comment = ${comment}
      WHERE id = ${examId}::uuid
    `;
    return { success: true };
  } catch (err) {
    console.error('Error grading submission:', err);
    throw new Error('Failed to grade submission');
  }
}
