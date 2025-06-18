function PDFViewer({ files }: { files: { name: string; url: string }[] }) {
  return (
    <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700 shadow-md col-span-2">
      <h2 className="text-xl font-semibold text-white mb-4">Uploaded Assignments</h2>
      <ul className="text-gray-300 space-y-2">
        {files.length > 0 ? (
          files.map((file, i) => (
            <li key={i}>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-400 transition"
              >
                {file.name}
              </a>
            </li>
          ))
        ) : (
          <li className="text-gray-500 italic">No assignments uploaded yet.</li>
        )}
      </ul>
    </div>
  );
}
