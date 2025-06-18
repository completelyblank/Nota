'use client';

import { useState, useEffect } from 'react';

type Student = {
  id: string;
  name: string;
  latest_marks: number | null;
};

export function MarksSubmission({ teacherId }: { teacherId: string }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentId, setStudentId] = useState('');
  const [marks, setMarks] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('/api/get-students');
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error('Failed to load students:', err);
      }
    };

    fetchStudents();
  }, []);

  const handleSelectStudent = (id: string) => {
    setStudentId(id);
    const selected = students.find((s) => s.id === id);
    setMarks(selected?.latest_marks?.toString() || '');
    setStatus('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/submit-marks', {
        method: 'POST',
        body: JSON.stringify({ studentId, marks: Number(marks), teacherId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('✅ Marks submitted successfully!');
      } else {
        setStatus(`❌ Error: ${data.error || 'Failed to submit marks.'}`);
      }
    } catch (err) {
      setStatus('❌ Network error. Try again.');
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700 shadow-md">
      <h2 className="text-xl font-semibold text-white mb-4">Submit / Update Marks</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={studentId}
          onChange={(e) => handleSelectStudent(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          required
        >
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name} ({student.id.slice(0, 8)})
            </option>
          ))}
        </select>

        <input
          type="number"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          placeholder="Enter Marks"
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          required
        />
        <button
          type="submit"
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
        >
          Submit
        </button>
      </form>
      {status && <p className="mt-2 text-sm text-gray-300">{status}</p>}
    </div>
  );
}
