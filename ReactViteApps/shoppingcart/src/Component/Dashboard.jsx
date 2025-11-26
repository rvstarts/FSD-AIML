import React, { useEffect, useState } from 'react'

function Dashboard() {
  const[counter,setCounter] = useState(10);
  const[pointer,setPointer] = useState(100);

  useEffect(()=>{
    console.log(counter);
    console.log(pointer);
  })
  return (
    <div>Dashboard
      <div>
        <h2>counter = {counter}</h2>
        <h2>pointer = {pointer}</h2>
      </div>

      <button onClick={()=>setCounter(counter+1)}> Counter</button>
      <button onClick={()=>setPointer(pointer-10)}> Pointer</button>
    </div>

  )
}

export default Dashboard