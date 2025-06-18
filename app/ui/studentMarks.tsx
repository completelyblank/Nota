'use client';

import { useEffect, useState } from 'react';

export function StudentMarks({ studentId }: { studentId: string }) {
  const [marks, setMarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const res = await fetch(`/api/student-marks?id=${studentId}`);
        const data = await res.json();
        setMarks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) fetchMarks();
  }, [studentId]);

  if (loading) {
    return <p className="text-center text-gray-300 animate-pulse">Loading marks...</p>;
  }

  if (!marks || marks.length === 0) {
    return <p className="text-center text-red-400">No marks found.</p>;
  }

  return (
    <div className="space-y-4">
      {marks.map((mark, index) => (
        <div
          key={index}
          className="p-4 rounded-lg bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-opacity-60 border border-white/10 shadow-md hover:shadow-xl transition duration-300"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-white-300">{mark.subject}</h3>
            <span className="text-lg font-semibold text-white">
              {mark.marks} / 100
            </span>
          </div>
          <p className="text-sm mt-2 text-gray-300 italic">{mark.comment}</p>
          <p className="text-xs text-gray-300 mt-1">
            Uploaded: {new Date(mark.uploaded_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
