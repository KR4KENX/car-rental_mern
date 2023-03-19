import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [loginData, setLoginData] = useState({username: '', password: ''})
  const navigate = useNavigate()
  const notLogged = useRef()

  const handleInput = ({ target: { name, value} }) => {
      setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const dataObj = {username: loginData.username, password: loginData.password}
    const instance = axios.create({withCredentials: true})
    instance.post('http://localhost:8080/auth/login', dataObj).then((res) => {
      if(res.status === 200){
        navigate('/')
      }
    }).catch(err => {
        notLogged.current.style.display = 'block'
    })
  }
  return (
    <div className='d-flex flex-column justify-content-center align-items-center shadow p-4 bg-dark rounded w-50 mx-auto'>
      <form>
        <h2 className='text-center text-light mb-2'>Login</h2>
        <div className="mb-3">
          <label className="form-label text-light">Username</label>
          <input type="text" className="form-control" name='username' onInput={(e) => handleInput(e)} />
       </div>
       <div className="mb-3">
          <label className="form-label text-light">Password</label>
          <input type="password" className="form-control" name='password' onInput={(e) => handleInput(e)} />
       </div>
      </form>
      <button type="submit" className="btn btn-primary mx-auto" onClick={(e) => handleSubmit(e)}>Submit</button>
      <div ref={notLogged} className="invalid-feedback text-center">
          Unable to login, try again.
        </div>
    </div>
  )
}

export default Login
