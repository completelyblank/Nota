'use client';

import { useState, useEffect } from 'react';

interface MarksSubmissionProps {
  teacherId: string;
}

export default function MarksSubmission({ teacherId }: MarksSubmissionProps) {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [subjects, setSubjects] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');

  // Fetch students list on mount
  useEffect(() => {
    fetch('/api/get-students')
      .then((res) => res.json())
      .then((data) => setStudents(data.students));
  }, []);

  // Fetch subjects when student changes
  useEffect(() => {
    if (studentId) {
      fetch('/api/student-subjects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId }),
      })
        .then((res) => res.json())
        .then((data) => {
          setSubjects(data.map((s: any) => s.subject));
          setSubject('');
        });
    } else {
      setSubjects([]);
      setSubject('');
    }
  }, [studentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !subject || !marks) {
      setStatus('❌ Fill all required fields.');
      return;
    }

    try {
      setStatus('Submitting...');

      const response = await fetch('/api/submit-marks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacherId, studentId, subject, marks: Number(marks), comment }),
      });

      if (!response.ok) throw new Error();

      setStatus('✅ Marks updated!');
      setMarks('');
      setComment('');
    } catch {
      setStatus('❌ Submission failed.');
    }
  };

  return (
    <div className="space-y-3 p-6 bg-gray-900 bg-opacity-60 rounded-2xl shadow-xl border border-white/10 text-white max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Update Student Marks</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          required
        >
          <option value="">Select Student</option>
          {students.map((student: any) => (
            <option key={student.id} value={student.id}>
              {student.name} ({student.id})
            </option>
          ))}
        </select>

        {subjects.length > 0 && (
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
        )}

        {subject && (
          <>
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              placeholder="Enter new marks"
              className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              required
            />
            <textarea
              placeholder="Comment (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition resize-none"
              rows={3}
            />
            <button
              type="submit"
              className="w-full py-2 font-medium rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-300 shadow-md"
            >
              Update
            </button>
          </>
        )}

        {status && <p className="text-sm text-center text-green-400">{status}</p>}
      </form>
    </div>

  );
}
