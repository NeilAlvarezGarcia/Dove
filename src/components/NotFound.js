import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='w-100 d-flex justify-content-center align-items-center' style={{height: '100%'}}>
        <h1>Error 404</h1>
        <p>page was not found</p>
        <Link to='/'>Go back</Link>
    </div>
  )
}

export default NotFound