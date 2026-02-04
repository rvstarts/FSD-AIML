import React from 'react'
import './icard.css'
function ICard({data}) {
  return (
    <div className='container'>
      <h1>ICARD</h1>
      <h2>ID: {data.id}</h2>
      <h2>Name:{data.name}</h2>
      <h2>Branch:{data.branch}</h2>
      <h2>Section:{data.section}</h2>
    </div>
  )
}

export default ICard