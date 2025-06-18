import { getUserInfo } from '../lib/data';
import { StudentMarks } from '../ui/studentMarks';
import { redirect } from 'next/navigation';

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
          backgroundImage: "url('https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1470&q=80')"
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />

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
