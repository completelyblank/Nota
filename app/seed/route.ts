import bcrypt from 'bcrypt';
import postgres from 'postgres';

const users = [
  {
    id: 'a1b2c3d4-e5f6-4a1b-9c8d-1234567890ab',
    name: 'John Student',
    email: 'student@nota.com',
    password: 'password123',
    role: 'student',
  },
  {
    id: 'b2c3d4e5-f6a1-4b2c-9d8e-abcdef123456',
    name: 'Jane Teacher',
    email: 'teacher@nota.com',
    password: 'password456',
    role: 'teacher',
  },
];

const exams = [
  {
    student_id: 'a1b2c3d4-e5f6-4a1b-9c8d-1234567890ab',
    teacher_id: 'b2c3d4e5-f6a1-4b2c-9d8e-abcdef123456',
    subject: 'Mathematics',
    marks: 92,
    gpa: 4.0,
    comment: 'Excellent work!',
    pdf_url: 'https://example.com/reports/math.pdf',
    uploaded_at: new Date().toISOString(),
  },
  {
    student_id: 'a1b2c3d4-e5f6-4a1b-9c8d-1234567890ab',
    teacher_id: 'b2c3d4e5-f6a1-4b2c-9d8e-abcdef123456',
    subject: 'Science',
    marks: 85,
    gpa: 3.7,
    comment: 'Good job!',
    pdf_url: 'https://example.com/reports/science.pdf',
    uploaded_at: new Date().toISOString(),
  },
];

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK (role IN ('student', 'teacher')) NOT NULL
    );
  `;

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await sql`
      INSERT INTO users (id, name, email, password, role)
      VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.role})
      ON CONFLICT (id) DO NOTHING;
    `;
  }
}

async function seedExams() {
  await sql`
    CREATE TABLE IF NOT EXISTS exams (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      student_id UUID REFERENCES users(id),
      teacher_id UUID REFERENCES users(id),
      subject TEXT,
      marks INTEGER,
      gpa FLOAT,
      comment TEXT,
      pdf_url TEXT,
      uploaded_at TIMESTAMPTZ
    );
  `;

  for (const exam of exams) {
    await sql`
      INSERT INTO exams (student_id, teacher_id, subject, marks, gpa, comment, pdf_url, uploaded_at)
      VALUES (
        ${exam.student_id},
        ${exam.teacher_id},
        ${exam.subject},
        ${exam.marks},
        ${exam.gpa},
        ${exam.comment},
        ${exam.pdf_url},
        ${exam.uploaded_at}
      ) ON CONFLICT DO NOTHING;
    `;
  }
}

export async function GET() {
  try {
    await sql.begin(async (sql) => {
      await seedUsers();
      await seedExams();
    });

    return new Response(JSON.stringify({ message: 'Database seeded successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Seed Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
