import { useApp } from './AppContext'

const App = () => {
  const {
    count,
    showCount,
    form,
    submittedName,
    handleChange,
    handleSubmit,
    increaseCount,
    resetCount,
    toggleCount,
  } = useApp()

  return (
    <div className="app">
      <nav className="navbar" aria-label="Primary navigation">
        <span className="nav-home">Home</span>
        <span className="nav-app">App</span>
      </nav>

      <main>
        <div className="register-title">Register form</div>

        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
          />

          <button className="button submit-button" type="submit">
            Submit
          </button>
        </form>
        {submittedName && <p className="submitted-message">Submitted: {submittedName}</p>}

        {showCount && (
          <div className="count-row">
            <span>Count: {count}</span>
            <div className="count-actions">
              <button
                className="button action-button"
                type="button"
                onClick={increaseCount}
              >
                Increase
              </button>
              <button
                className="button reset-button"
                type="button"
                onClick={resetCount}
              >
                reset
              </button>
            </div>
          </div>
        )}

        <button
          className="button action-button toggle-button"
          type="button"
          onClick={toggleCount}
        >
          Toggle
        </button>
      </main>
    </div>
  )
}

export default App
