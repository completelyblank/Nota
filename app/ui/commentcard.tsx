function CommentCard({ comments }: { comments: string[] }) {
  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-700">
      <h2 className="text-xl font-semibold text-white mb-3">Teacher Comments</h2>
      {comments.length > 0 ? (
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          {comments.map((comment, index) => (
            <li key={index} className="text-sm">{comment}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No comments yet.</p>
      )}
    </div>
  );
}
