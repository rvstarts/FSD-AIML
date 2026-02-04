import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Gallery from './component/Gallery'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h2>ABES Engineering College</h2>
        <Gallery/>
      </div>
    </>
  )
}

export default App