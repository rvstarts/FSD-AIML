import React from 'react'
import ICard from './ICard'

function Gallery() {
    const student=[{
        id:"2300",
        name:"Sachin",
        branch:"AIML",
        section:"B"
    },
    {
       id:"2301",
        name:"Vikash",
        branch:"AIML",
        section:"B" 
    },
    {
        id:"2302",
        name:"Yuvraj",
        branch:"AIML",
        section:"B"
    }
]
  return (
    <div>
      {
        student.map((ele) => (
            <ICard key={ele.id} data={ele}/>
        ))
      }
    </div>
  )
}

export default Gallery