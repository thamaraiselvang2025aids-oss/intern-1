import axios from 'axios'
import { useEffect, useState } from 'react'

const User = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users', {
          signal: controller.signal,
        })
        setUsers(response.data)
      } catch (fetchError) {
        if (!controller.signal.aborted) {
          setError(fetchError instanceof Error ? fetchError.message : 'Could not load user.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchUsers()
    return () => controller.abort()
  }, [])

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" aria-live="polite">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">User</h2>
      {isLoading && <p className="text-slate-600">Loading user...</p>}
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      {!isLoading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 text-slate-900">
                <th className="px-4 py-3 font-semibold" scope="col">Name</th>
                <th className="px-4 py-3 font-semibold" scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="border-b border-slate-100 last:border-0" key={user.id}>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td className="px-4 py-3 text-slate-500" colSpan={2}>No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default User
