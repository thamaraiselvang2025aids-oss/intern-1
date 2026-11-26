import { useState } from 'react'

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [submittedName, setSubmittedName] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser((currentUser) => ({ ...currentUser, [name]: value }))
    setSubmittedName('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmittedName(user.name.trim())
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Get started</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Create your account</h1>
        <p className="mt-2 text-slate-600">Fill in your details to register.</p>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="register-name">
            Name
          </label>
          <input
            autoComplete="name"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            id="register-name"
            name="name"
            onChange={handleChange}
            placeholder="Enter your name Ex:Selvan"
            required
            type="text"
            value={user.name}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="register-email">
            Email
          </label>
          <input
            autoComplete="email"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            id="register-email"
            name="email"
            onChange={handleChange}
            placeholder="selvan@gmail.com"
            required
            type="email"
            value={user.email}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="register-password">
            Password
          </label>
          <input
            autoComplete="new-password"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            id="register-password"
            minLength={8}
            name="password"
            onChange={handleChange}
            placeholder="Enter your password: min 8 characters"
            required
            type="password"
            value={user.password}
          />
        </div>
        <button
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          type="submit"
        >
          Register
        </button>
      </form>
      {submittedName && (
        <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status">
          Thanks, {submittedName}! Your form was submitted.
        </p>
      )}
    </section>
  )
}

export default Register
