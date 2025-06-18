// ui/answerForm.tsx
'use client';
import { useState } from 'react';

export function StudentAnswerForm({
  studentId,
  teacherId,
}: {
  studentId: string;
  teacherId?: string;
}) {
  const [inputTeacherId, setInputTeacherId] = useState('');
  const [answer, setAnswer] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalTeacherId = teacherId || (typeof inputTeacherId === 'string' ? inputTeacherId.trim() : '');


    if (!finalTeacherId) {
      setMessage('Please provide a teacher ID.');
      return;
    }

    const res = await fetch('/api/submit-answer', {
      method: 'POST',
      body: JSON.stringify({
        studentId,
        teacherId: finalTeacherId,
        subject,
        answer,
      }),
    });


    if (res.ok) {
      setMessage('Answer submitted successfully!');
      setAnswer('');
      if (!teacherId) setInputTeacherId('');
    } else {
      setMessage('Failed to submit answer.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
      {!teacherId && (
        <div>
          <label className="block text-gray-300 mb-1">Enter Teacher ID</label>
          <input
            type="text"
            value={inputTeacherId}
            onChange={(e) => setInputTeacherId(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
            placeholder="Teacher UUID"
            required
          />
        </div>
      )}
      <div>
        <label className="block text-gray-300 mb-1">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
          placeholder="Subject name"
          required
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-1">Your Answer</label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
          placeholder="Write your answer here..."
          required
        />
      </div>

      <button
        type="submit"
        className="bg-teal-600 hover:bg-teal-700 transition text-white px-4 py-2 rounded"
      >
        Submit
      </button>

      {message && <p className="text-sm text-teal-400">{message}</p>}
    </form>
  );
}
