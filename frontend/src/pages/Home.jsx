import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='h-50 w-50 '>
        <h1>
            welcome to home
        </h1>
        <p><Link className='btn btn-primary' to="/signup">signup</Link></p>
        <p><Link className='btn btn-primary' to="/login">login</Link></p>  
    </div>
  )
}

export default Home