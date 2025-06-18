// User role: either student or teacher
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
}

// Exam model: includes PDF, GPA, comments, and optional names
export interface Exam {
  id: string;
  student_id: string;
  teacher_id: string;
  subject: string;
  marks: number;
  gpa: number;
  comment: string;
  pdf_url?: string;        // optional in case not uploaded
  uploaded_at: string;
  student_name?: string;   // joined in queries
  teacher_name?: string;   // joined in queries
}

// GPA aggregate stats
export interface GPAStats {
  exam_count: number;
  avg_gpa: number;
  max_gpa: number;
  min_gpa: number;
}

// Assignment file structure (for teacher view)
export interface Assignment {
  id: string;
  student_id: string;
  file_name: string;
  file_url: string;
  uploaded_at: string;
  student_name?: string;
}
