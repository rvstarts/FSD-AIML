import React from 'react'

function MainLayout() {
  return (
    <div>
    <nav>
      <Link to="/dashboard"> Dashboard </Link>
      <Link to="/login"> Login </Link>
      <Link to="/register"> Register </Link>
    </nav>
        </div>
  )
}

export default MainLayout
