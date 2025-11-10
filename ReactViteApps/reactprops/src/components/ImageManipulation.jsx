import React, { useState } from 'react'

function ImageManipulation() {
    const[cubeHeight,setCubeHeight] = useState(200);
      const[cubeWidth,setCubeWidth] = useState(200);
      const[imageAngle,setImageAngle] = useState(0); 

  const[red,setred] = useState(0);
  const[green,setgreen] = useState(0);
  const[blue,setblue] = useState(0);

  function changeBGcolor(){
    setred(Math.random() * 255);
    setgreen(Math.random() * 255);
    setblue(Math.random() * 255);
  }
  function rotateImage(){
    setImageAngle(imageAngle + 15);
  }
  

  return (
    <div style={{
      border:'2px solid red', 
      height:'500px', 
      width:'400px', 
      margin:'0px auto', 
      padding:'50px'
    }}> 
      <h3>Image Manipulation</h3>
      <div style={{textAlign: 'center', marginBottom: '20px'}}>
        <h2 style={{color: 'red', fontSize: '16px', margin: '5px'}}>
          Red Color Value: {red}
        </h2>
        <h2 style={{color: 'green', fontSize: '16px', margin: '5px'}}>  
          Green Color Value: {green}
        </h2>
        <h2 style={{color: 'blue', fontSize: '16px', margin: '5px'}}>
          Blue Color Value: {blue}
        </h2>
      </div>
        <div style={{textAlign: 'center', margin: '20px 0'}}>
            <img 
              src="https://www.bing.com/th/id/OIP.BR_P-s2KtVqO1Jfwht53NgHaHa?w=183&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=1.3&pid=3.1&rm=2&ucfimg=1" 
              height={cubeHeight} 
              width={cubeWidth}
              alt="cube"
              style={{
                display: 'block', 
                margin: '0 auto',
                backgroundColor:`rgb(${red},${green},${blue})`,
                padding: '20px',
                borderRadius: '10px',
                transform: `rotate(${imageAngle}deg)`
              }}
            />
        </div>
        <div style={{textAlign: 'center', marginTop: '20px'}}>
            <button 
              onClick={()=>setCubeHeight(cubeHeight+20)}
              style={{
                padding: '10px 20px',
                margin: '5px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Increase Height
            </button>
            <button 
              onClick={()=>setCubeHeight(cubeHeight-20)}
              style={{
                padding: '10px 20px',
                margin: '5px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Decrease Height
            </button>
            <br/>
            <button 
              onClick={()=>setCubeWidth(cubeWidth+20)}
              style={{
                padding: '10px 20px',
                margin: '5px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Increase Width
            </button>
            <button 
              onClick={()=>setCubeWidth(cubeWidth-20)}
              style={{
                padding: '10px 20px',
                margin: '5px',
                backgroundColor: '#FF9800',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Decrease Width
            </button>
            <br/>
            <button 
              onClick={changeBGcolor}
              style={{
                padding: '10px 20px',
                margin: '5px',
                backgroundColor: '#9C27B0',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Change BG Color
            </button>
            <button 
              onClick={rotateImage}
              style={{
                padding: '10px 20px',
                margin: '5px',
                backgroundColor: '#607D8B',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Rotate Image
            </button>
        </div>

    </div>
  )
}

export default ImageManipulation