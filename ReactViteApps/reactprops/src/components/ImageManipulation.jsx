import React, { useState } from 'react'

function ImageManipulation() {
    const[cubeHeight,setCubeHeight] = useState(200);
    const[cubeWidth,setCubeWidth] = useState(200);
  return (
    <div style={{border:'2px solid red', height:'500px', width:'400px' , margin:'0px auto' , padding:'50px'}}> 
      <h3>Image Manipulation</h3>
        <div style={{textAlign: 'center', margin: '20px 0'}}>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2991/2991231.png" 
              height={cubeHeight} 
              width={cubeWidth}
              alt="cube"
              style={{display: 'block', margin: '0 auto'}}
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
        </div>
    </div>
  )
}

export default ImageManipulation