// AddExamForm.tsx
'use client';
import { useState } from 'react';

export function AddExamForm({ teacherId }: { teacherId: string }) {
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState(0);
  const [comment, setComment] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/add-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, teacherId, subject, marks, comment, answer }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage('✅ Exam added!');
        setStudentId('');
        setSubject('');
        setMarks(0);
        setComment('');
        setAnswer('');
      } else {
        setMessage('❌ Failed to add exam');
      }
    } catch {
      setMessage('❌ Error adding exam');
    }
  };

  return (
    <div className="space-y-3 p-6 bg-gray-900 bg-opacity-60 rounded-2xl shadow-xl border border-white/10 text-white max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Add Exam</h2>

      <input
        value={studentId}
        onChange={e => setStudentId(e.target.value)}
        placeholder="Student ID"
        className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
      />
      <input
        value={subject}
        onChange={e => setSubject(e.target.value)}
        placeholder="Subject"
        className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
      />
      <input
        type="number"
        value={marks}
        onChange={e => setMarks(+e.target.value)}
        placeholder="Marks"
        className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
      />
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Comment"
        rows={3}
        className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition resize-none"
      />
      <textarea
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        placeholder="Answer (optional)"
        rows={3}
        className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition resize-none"
      />

      <button
        onClick={handleSubmit}
        className="w-full py-2 font-medium rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-300 shadow-md"
      >
        Add Exam
      </button>

      {message && (
        <p className="text-sm text-center text-green-400 animate-pulse">{message}</p>
      )}
    </div>


  );
}
