import React from 'react'
import { useState } from 'react'
function Registration() {
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  async function captureData(e){
   e.preventDefault();
   try {
    const res=await fetch('http://localhost:4007/register',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name,email,password})
    })

    const data=await res.json();
    alert(data.msg);

    if(res.ok && data.msg!=='Student is already registered'){
      setName("");
      setEmail("");
      setPassword("");
    }
   } catch (error) {
    console.log(error);
    alert('Unable to connect to backend server');
   }

  }





  return (
     <div>
      <form onSubmit={captureData}>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Name
          </label>
          <input
            type="text"
            onChange={(e)=>setName(e.target.value)}
            value={name}
            className="form-control"
            id="exampleInputName1"
            aria-describedby="emailHelp"
          />

          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Registration
