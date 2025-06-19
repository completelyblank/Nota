import { getUserInfo } from '../lib/data';
import { StudentMarks } from '../ui/studentMarks';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function MarksPage() {
  const user = await getUserInfo();

  if (user.role !== 'student') {
    return redirect('/');
  }

  return (
    <div className="relative min-h-screen text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1470&q=80')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />

      {/* Buttons */}
      <div className="absolute top-6 right-6 flex gap-3 z-30">
        {/* Dashboard Button */}
        <Link href="/dashboard">
          <button className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-800 hover:via-green-900 hover:to-black text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg">
            Dashboard
          </button>
        </Link>

        {/* Logout Button */}
        <form action="/api/logout" method="post">
          <button
            type="submit"
            className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-800 hover:via-red-900 hover:to-black text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg"
          >
            Logout
          </button>
        </form>
      </div>
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-4xl p-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl">
          <h1 className="text-4xl font-bold text-center text-green-200 mb-8 tracking-wide drop-shadow-lg">
            Your Exam Marks
          </h1>
          <StudentMarks studentId={user.id} />
        </div>
      </div>
    </div>
  );
}
