import "./App.css";

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-blue-900">Ardenwell Church</h1>

        <p className="mt-2 text-slate-600">Tailwind CSS is working!</p>

        <button className="mt-5 rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800">
          Test Button
        </button>
      </div>
    </main>
  );
}

export default App;