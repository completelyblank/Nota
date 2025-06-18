function StatCard({ title, count }: { title: string; count: number }) {
  return (
    <div className="bg-gray-900 bg-opacity-60 border border-gray-700 rounded-2xl shadow-md p-6 backdrop-blur-md transition-transform hover:scale-105">
      <h2 className="text-xl font-medium text-gray-300 mb-2">{title}</h2>
      <p className="text-4xl font-bold text-white">{count}</p>
    </div>
  );
}
