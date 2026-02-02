import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  function getData() {
    alert('Hello from App component');


  }

  return (
    <>
     <h2>Welcome to React app</h2>
     <button onClick={getData}>fetchdata</button>
    </>
  )
}

export default App
