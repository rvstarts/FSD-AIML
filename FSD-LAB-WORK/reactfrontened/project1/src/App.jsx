import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const[data,setData]=useState([]);

  async function getData(){
    const response = await fetch('http://localhost:4007/data');
    const jsondata = await response.json();
    setData(jsondata);
    console.log(jsondata.msg);
  }

  return (
    <>
     <h2>Welcome to React app</h2>
     {JSON.stringify(data)}
     <button onClick={getData}>fetchdata</button>
    </>
  )
}

export default App
