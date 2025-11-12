import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Profile from './Component/Profile'
import Gallery from './Component/Gallery'


function App() {

  return (
    <>
  <div className='text-center '>
  <div className='bg-green-600 text-white rounded-lg px-6 py-3 inline-block shadow-lg'>Welcome to React App</div>
      <div>
        <Profile/>
      </div>
      {/* <div>
        <Gallery/>
      </div> */}
      </div>
    </>
  )
}

export default App
