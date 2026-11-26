import React from 'react'
import Student from './assets/components/Student'
//rafce 
const App = () => {
  let name='test'
  return (
    <>
      <div>App</div>
      <h1>this is {name}</h1>
      <Student name = "jith" age = "21"/>
    </>
  )
}

export default App
