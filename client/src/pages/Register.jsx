import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [registerData, setRegisterData] = useState({username: '', password: '', terms: false, voucher: ''})
  const invalidPassword = useRef()
  const invalidTerms = useRef()
  const navigate = useNavigate()
  
  const handleInput = ({ target: { name, value, checked } }) => {
    if(name !== 'terms'){
      setRegisterData((prev) => ({ ...prev, [name]: value }));
    }
    else{
      setRegisterData((prev) => ({...prev, terms: checked}))
    }
    console.log(registerData)
  };
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(registerData.password.indexOf(' ') !== -1 || registerData.password.length < 4 || registerData.password.length > 10){
      invalidPassword.current.style.display = 'block'
      return;
    }
    if(registerData.terms === false){
      invalidTerms.current.style.display = 'block'
      return;
    }
    const dataObj = {username: registerData.username, password: registerData.password, secret: registerData.voucher}
    const instance = axios.create({withCredentials: true})
    instance.post('http://localhost:8080/auth/register', dataObj).then((res) => {
      console.log(res)
      if(res.status === 201) navigate('/login')
    })
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center shadow p-4 bg-dark rounded w-50 mx-auto'>
      <form className='w-75'>
        <h2 className='text-center text-light mb-2'>Register</h2>
        <div className="mb-3">
          <label className="form-label text-light">Username</label>
          <input type="text" name='username' className="form-control" required onInput={(e) => handleInput(e)}/>
        </div>
       <div className="mb-3">
          <label className="form-label text-light">Password</label>
          <input type="password" name='password' className="form-control" required onInput={(e) => handleInput(e)}/>
          <div ref={invalidPassword} className="invalid-feedback">
            Incorrect password.
          </div>
          <div className="form-text">
            Your password must be 4-10 characters long, contain letters and numbers, and must not contain spaces.
          </div>
       </div>
       <div className="mb-3">
          <label className="form-label text-light">Voucher code</label>
          <input type="text" name='voucher' className="form-control" onInput={(e) => handleInput(e)}/>
        </div>
        <div className="mb-3">
          <input className="form-check-input" name='terms' type="checkbox" id='terms' onInput={(e) => handleInput(e)} required />
          <label className="form-check-label text-light mx-1" htmlFor='terms'>
            Agree to terms and conditions
          </label>
          <div ref={invalidTerms} className="invalid-feedback">
            You must agree before submitting.
          </div>
      </div>
      </form>
      <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-primary mx-auto">Submit</button>
    </div>
  )
}

export default Register
