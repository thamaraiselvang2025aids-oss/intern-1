import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'

const registrationSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
})

const getFieldErrors = (values) => {
  const result = registrationSchema.safeParse(values)
  if (result.success) return {}

  return result.error.issues.reduce((fieldErrors, issue) => {
    const field = issue.path[0]
    if (typeof field === 'string' && !fieldErrors[field]) {
      fieldErrors[field] = issue.message
    }
    return fieldErrors
  }, {})
}

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [submittedName, setSubmittedName] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const focusFirstError = useRef(false)

  useEffect(() => {
    if (!focusFirstError.current) return

    const firstInvalidField = Object.keys(errors)[0]
    if (firstInvalidField) {
      document.getElementById(`register-${firstInvalidField}`)?.focus()
    }
    focusFirstError.current = false
  }, [errors])

  const handleChange = (event) => {
    const { name, value } = event.target
    const updatedUser = { ...user, [name]: value }
    setUser(updatedUser)
    if (hasSubmitted) setErrors(getFieldErrors(updatedUser))
    setSubmittedName('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setHasSubmitted(true)

    const result = registrationSchema.safeParse(user)
    if (!result.success) {
      const nextErrors = getFieldErrors(user)
      focusFirstError.current = true
      setErrors(nextErrors)
      setSubmittedName('')
      return
    }

    setErrors({})
    setSubmittedName(result.data.name)
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Get started</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Create your account</h1>
        <p className="mt-2 text-slate-600">Fill in your details to register.</p>
      </div>
      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="register-name">
            Name
          </label>
          <input
            autoComplete="name"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            aria-describedby={errors.name ? 'register-name-error' : undefined}
            aria-invalid={Boolean(errors.name)}
            id="register-name"
            name="name"
            onChange={handleChange}
            placeholder="Enter your name Ex:Selvan"
            type="text"
            value={user.name}
          />
          {errors.name && <p className="mt-1.5 text-sm text-red-600" id="register-name-error" role="alert">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="register-email">
            Email
          </label>
          <input
            autoComplete="email"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            aria-describedby={errors.email ? 'register-email-error' : undefined}
            aria-invalid={Boolean(errors.email)}
            id="register-email"
            name="email"
            onChange={handleChange}
            placeholder="selvan@gmail.com"
            type="email"
            value={user.email}
          />
          {errors.email && <p className="mt-1.5 text-sm text-red-600" id="register-email-error" role="alert">{errors.email}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="register-password">
            Password
          </label>
          <input
            autoComplete="new-password"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            aria-describedby={errors.password ? 'register-password-error' : undefined}
            aria-invalid={Boolean(errors.password)}
            id="register-password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password: min 8 characters"
            type="password"
            value={user.password}
          />
          {errors.password && <p className="mt-1.5 text-sm text-red-600" id="register-password-error" role="alert">{errors.password}</p>}
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
