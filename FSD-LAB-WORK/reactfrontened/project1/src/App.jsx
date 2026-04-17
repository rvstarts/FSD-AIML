import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './component/Main'
import FetchData from './component/FetchData'
import Login from './component/login'
import Registration from './component/registration'
import Dashboard from './component/Dashboard'
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
function App() {
 

  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Main/>}/>
    <Route path='/fetchdata' element={<FetchData/>}/>
    <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Registration/>}/>
    <Route path='/registration' element={<Registration/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App