import React from 'react'

function Profile() {
  return (
    <>
        <div className='bg-emerald-100  '>
            <h2 className='text-4xl '>
                Welcome to my profile page
            </h2>
            <img src="https://th.bing.com/th/id/OIP.zab9C4s18TqBcfdnXqyoHQAAAA?w=117&h=108&c=7&bgcl=38185d&r=0&o=6&dpr=1.3&pid=13.1" alt="Profile Photo" className='h-[200px] w-[200px] border-4 rounded-[50%] block mx-auto p-4 m-4'/>
            <div>Name-Vikash Raghuvanshi</div>
            <div>Section- AIML 'B'</div>
            <div>RollNo-2300321</div>
            <div>College- ABES Engineering College, Ghaziabad</div>
        </div>
    </>
  )
}

export default Profile