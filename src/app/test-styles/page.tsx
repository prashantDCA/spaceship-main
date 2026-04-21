export default function TestStyles() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4 text-blue-400">Tailwind CSS Test</h1>
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <p className="text-slate-300 mb-4">
          If you can see this styled properly, Tailwind CSS is working!
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
          Test Button
        </button>
      </div>
    </div>
  )
}