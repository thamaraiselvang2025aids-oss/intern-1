import Student from './assets/components/Student'
import Register from './assets/hooks/Register'

const App = () => {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <Register />
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">Student</h2>
          <Student name="jith" age="21" />
        </section>
      </div>
    </main>
  )
}

export default App
