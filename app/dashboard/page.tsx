import {
  getUserInfo,
  fetchStudentDashboardData,
  fetchTeacherDashboardData,
  getDefaultTeacherId
} from '../lib/data';

import { AddExamForm } from '../ui/addExamForm';
import { StudentAnswerForm } from '../ui/answerForm';
import MarksSubmission from '../ui/marksubmission';

export default async function Dashboard() {
  const user = await getUserInfo();
  let studentData = null;
  let teacherData = null;
  let defaultTeacherId = null;

  if (user.role === 'teacher') {
    teacherData = await fetchTeacherDashboardData();
  } else if (user.role === 'student') {
    studentData = await fetchStudentDashboardData(user.id);
    defaultTeacherId = await getDefaultTeacherId();
  }

  return (
    <div className="relative min-h-screen min-w-screen text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            'url(https://c0.wallpaperflare.com/preview/700/360/51/bible-wallpaper-devotional-bible-study.jpg)',
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />
      {/* Top-right Buttons */}
      <div className="absolute top-6 right-6 z-30 flex gap-4">
        {/* Transcript */}
        <form action="/marks" method="post">
          <button
            type="submit"
            className="z-30 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-800 hover:via-blue-900 hover:to-black text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md"
          >
            Transcript
          </button>
        </form>

        {/* Logout */}
        <form action="/api/logout" method="post">
          <button
            type="submit"
            className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-800 hover:via-red-900 hover:to-black text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md z-30"
          >
            Logout
          </button>
        </form>
      </div>


      {/* Content */}
      <div className="relative z-20 px-6 py-12 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-7xl space-y-16">

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-5xl font-extrabold tracking-tight text-white drop-shadow">
              Nota Dashboard
            </h1>
            <p className="text-gray-300 text-lg">
              Welcome, <span className="text-white font-bold">{user.name}</span>
            </p>
            <p className="text-gray-400 text-sm">
              Role: <span className="capitalize text-white">{user.role}</span>
            </p>
          </div>

          {/* Main Panels */}
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Left Panel */}
            <div className="space-y-10">
              {/* Student Panel */}
              {studentData && (
                <div className="p-8 rounded-2xl shadow-xl border border-white/10 space-y-6 bg-white/5">
                  <h2 className="text-3xl font-semibold text-white">Student Panel</h2>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-300">Answers</h3>
                    <ul className="list-disc pl-5 mt-2 text-gray-400 text-sm space-y-2">
                      {studentData.answers.map((answer, index) => (
                        <li key={index}>{answer}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-300">Comments</h3>
                    <ul className="list-disc pl-5 mt-2 text-gray-400 text-sm space-y-2">
                      {studentData.comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">✏️ Submit New Answer</h3>
                    <div className="bg-white/10 p-4 rounded-xl">
                      <StudentAnswerForm
                        studentId={user.id}
                        teacherId={defaultTeacherId || undefined}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Teacher Panel */}
              {teacherData && (
                <div className="p-8 rounded-2xl shadow-xl border border-white/10 space-y-8 bg-white/5">
                  <h2 className="text-3xl font-semibold text-white">Teacher Panel</h2>
                  <p className="text-lg text-gray-300">
                    Total Students:{" "}
                    <span className="text-white font-semibold">{teacherData.studentsCount}</span>
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-200 mb-2">➕ Add Assignment</h3>
                      <AddExamForm teacherId={user.id} />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-200 mb-2">
                        Submit/Update Marks
                      </h3>
                      <MarksSubmission teacherId={user.id} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side Image Panel */}
            <div className="flex justify-center items-center">
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-4 max-w-sm w-full hover:scale-105 transition-transform duration-300">
                {/* Role Tag */}
                <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-3 py-1 rounded-full shadow">
                  {user.role === 'student' ? 'Student Canvas' : 'Teacher Canvas'}
                </div>

                {/* Image */}
                <img
                  src={
                    user.role === 'student'
                      ? 'https://c1.wallpaperflare.com/preview/794/664/854/various-art-book-books.jpg'
                      : 'https://c1.wallpaperflare.com/preview/25/559/684/teacher-board-tutor-school.jpg'
                  }
                  alt={user.role}
                  className="rounded-xl w-full object-cover aspect-video shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
