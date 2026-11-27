import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [count, setCount] = useState(0)
  const [showCount, setShowCount] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [submittedName, setSubmittedName] = useState('')

  const handleChange = (event) => {
    setSubmittedName('')
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmittedName(form.name.trim())
  }

  const increaseCount = () => {
    setCount((current) => current + 1)
  }

  const resetCount = () => {
    setCount(0)
  }

  const toggleCount = () => {
    setShowCount((current) => !current)
  }

  const value = {
    count,
    showCount,
    form,
    submittedName,
    handleChange,
    handleSubmit,
    increaseCount,
    resetCount,
    toggleCount,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used inside AppProvider')
  }
  return context
}
