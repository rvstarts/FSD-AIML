import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route , Routes } from 'react-router-dom'
import Login from './Component/Login'
import Registration from './Component/Registration'
import Dashboard from './Component/Dashboard'
import MainLayout from './Component/MainLayout'
function App() {
  

  return (
    <>
      {/* <h2> welcome to shopping cart</h2> */}
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Registration/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/mainlayout' element={<MainLayout/>} />

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
