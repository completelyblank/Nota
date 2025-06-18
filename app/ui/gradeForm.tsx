// app/ui/gradeForm.tsx
'use client';

import { useState } from 'react';

export function GradeForm() {
  const [examId, setExamId] = useState('');
  const [marks, setMarks] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
  try {
    const res = await fetch('/api/add-grade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ examId, marks, comment }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage('Grade added.');
      setMarks(0);
      setExamId('');
      setComment('');
    } else {
      setMessage('Failed to add grade.');
    }
  } catch {
    setMessage('Error adding grade.');
  }
};

  return (
    <div className="space-y-4 p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20 max-w-md mx-auto text-white">
  <input
    value={examId}
    onChange={e => setExamId(e.target.value)}
    placeholder="Exam ID"
    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300 transition"
  />
  <input
    type="number"
    value={marks}
    onChange={e => setMarks(+e.target.value)}
    placeholder="Marks"
    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-300 transition"
  />
  <textarea
    value={comment}
    onChange={e => setComment(e.target.value)}
    placeholder="Comment"
    rows={4}
    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-300 transition resize-none"
  />
  <button
    onClick={handleSubmit}
    className="w-full py-2 font-semibold rounded-md bg-gradient-to-r from-gray-500 via-gray-100 to-gray-500 hover:from-gray-100 hover:to-gray-500 transition-all duration-300 shadow-md hover:shadow-lg text-black text-bold"
  >
    Submit Grade
  </button>
  {message && (
    <p className="text-sm text-center text-green-400 animate-pulse">{message}</p>
  )}
</div>

  );
}
