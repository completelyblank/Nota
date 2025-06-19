<img width="951" alt="first" src="https://github.com/user-attachments/assets/579f033e-0e58-4bd5-8cdd-41fdfadfc7b9" />

# 🎓 Nota

A fullstack application built with **Next.js (App Router)** and **Supabase**, enabling role-based access for **students** and **teachers** to manage exam submissions, grading, and feedback.

---

## 📸 Project Preview

| Student View | Teacher View |
|--------------|--------------|
| ![Student Dashboard](<img width="949" alt="fourth" src="https://github.com/user-attachments/assets/efef99c7-a910-4247-b018-b56357bd5b48" />
 | ![Teacher Dashboard](<img width="949" alt="seventh" src="https://github.com/user-attachments/assets/4c189f73-0977-43cc-8c3c-53c87927efa8" />
|

---

## 🚀 Features

### 🧑‍🎓 Student Functionality
- Secure login/signup via Supabase
- Submit answers to exams
- View marks, feedback comments, and GPA
- See past submissions sorted by latest

### 👩‍🏫 Teacher Functionality
- Secure login via Supabase
- Grade student answers
- Write and update feedback comments
- Track student count and activity

---

## 🧠 Architecture

Next.js App Router
├── Backend
│ ├── Server actions (app/api/)
│ └── PostgreSQL queries (Postgres.js)
├── Auth (Supabase)
├── DB: PostgreSQL (via Supabase)
└── Frontend (React, Tailwind)


> Uses both Server Components and Client Components, depending on interactivity.

---

## 🧪 Tech Stack

| Layer        | Tech                          |
|--------------|-------------------------------|
| Frontend     | Next.js 14 (App Router)       |
| Styling      | TailwindCSS                   |
| Auth         | Supabase Auth                 |
| Backend      | PostgreSQL (via Supabase SQL) |
| ORM          | `postgres` (lightweight SQL)  |
| Hosting      | Vercel                        |

---

## DB Schema

CREATE TABLE public.users (
  id uuid PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'admin'))
);


CREATE TABLE public.exams (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id uuid REFERENCES users(id),
  teacher_id uuid REFERENCES users(id),
  subject TEXT NOT NULL CHECK (char_length(subject) > 0),
  marks INTEGER CHECK (marks >= 0 AND marks <= 100),
  comment TEXT NOT NULL CHECK (char_length(comment) > 0),
  answer TEXT,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
