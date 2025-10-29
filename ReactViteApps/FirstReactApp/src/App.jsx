import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Profile from './Component/Profile'
import Gallery from './Component/Gallery'


function App() {

  return (
    <>
  <div className='text-center '>
  <div className='bg-blue-600 text-white rounded-md px-4 py-2 inline-block'>Welcome to React App</div>
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
