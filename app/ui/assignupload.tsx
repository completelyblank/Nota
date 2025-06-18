'use client';

import { useState } from 'react';

interface AssignmentUploadProps {
  studentId: string;
}

export default function AssignmentUpload({ studentId }: AssignmentUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setStatus('Please select a PDF file.');
      return;
    }

    // TODO: Replace this with your actual upload logic
    try {
      setStatus('Uploading...');

      // Example POST call (to your backend)
      /*
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('studentId', studentId);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');
      */

      // Simulated delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('Upload successful!');
      setSelectedFile(null);
    } catch (err) {
      setStatus('Upload failed. Try again.');
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700 shadow-md">
      <h2 className="text-xl mb-4 text-white">Submit Assignment (PDF)</h2>
      <form onSubmit={handleUpload} className="flex flex-col space-y-4">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="text-white"
        />
        <button
          type="submit"
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
        >
          Upload
        </button>
        {status && <p className="text-sm text-gray-400 italic">{status}</p>}
      </form>
    </div>
  );
}
