export const users = [
  {
    id: 'a1b2c3d4-e5f6-4a1b-9c8d-1234567890ab',
    email: 'student1@nota.com',
    password: 'studentpass',
    role: 'student',
  },
  {
    id: 'b2c3d4e5-f6a1-4b2c-9d8e-abcdef123456',
    email: 'teacher1@nota.com',
    password: 'teacherpass',
    role: 'teacher',
  },
];

export const exams = [
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