import React from 'react'

function Login() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center shadow p-4 bg-dark rounded w-50 mx-auto'>
      <form>
        <h2 className='text-center text-light mb-2'>Login</h2>
        <div className="mb-3">
          <label className="form-label text-light">Username</label>
          <input type="text" className="form-control"/>
       </div>
       <div class="mb-3">
          <label className="form-label text-light">Password</label>
          <input type="password" className="form-control"/>
       </div>
      </form>
      <button type="submit" className="btn btn-primary mx-auto">Submit</button>
    </div>
  )
}

export default Login
