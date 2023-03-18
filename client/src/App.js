import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './pages/Login';
import Register from './pages/Register'
import Home from './pages/Home'
import LogoutIcon from './images/logout.svg'
import axios from 'axios'

function App() {
  const [user, setUser] = useState('')
  const [isLogged, setIsLogged] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    const instance = axios.create({withCredentials: true})
    instance.get('http://localhost:8080/auth/').then((res) => {
      if(res.data === 'not logged'){
        console.log('not logged')
        setIsLogged(false)
        setUser('')
      }
      else{
        setIsLogged(true)
        setUser(res.data)
      }
    })
  }, [document.location.href])

  const LoggedComponent = () => {
    return (
    <div className='d-flex flex-column justify-content-center align-items-center text-light mx-4'>
      <img role='button' src={LogoutIcon} onClick={() => {
        axios.get('http://localhost:8080/auth/logout', { withCredentials: true }).then((e) => navigate('/login'))
      }} />
      <p>{user}</p>
    </div>
    )
  }
  return (
    <div className='container'>
      <div className='d-flex flex-row justify-content-between align-items-center shadow p-3 mb-5 bg-dark rounded'>
        <h1 className='text-light'>RENT-CAR24.pl</h1>
        <div className='d-flex flex-row align-items-center'>
          <Link className='link-light mx-2 fs-5' to='/login'>Login</Link>
          <Link className='link-light mx-2 fs-5' to='/register'>Register</Link>
          <Link className='link-light mx-2 fs-5' to='/'>Home</Link>
          {isLogged === false ? '' : <LoggedComponent />}
        </div>
      </div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route exact path='/' element={<Home logged={isLogged}/>} />

      </Routes>
    </div>
  );
}

export default App;
