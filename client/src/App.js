import { useEffect, useState, useRef } from 'react';
import './App.css';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './pages/Login';
import Register from './pages/Register'
import Home from './pages/Home'
import CarRent from './components/CarRent'
import LogoutIcon from './images/logout.svg'
import axios from 'axios'

function App() {
  const [user, setUser] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
 
  //links refs
  const loginLink = useRef()
  const registerLink = useRef()
  const homeLink = useRef()
  
  useEffect(() => {
    const instance = axios.create({withCredentials: true})
    instance.get('http://localhost:8080/auth/').then((res) => {
      if(res.data === 'not logged'){
        console.log('not logged')
        setUser('')
      }
      else{
        setUser(res.data.username)
        if(res.data.isAdmin === true) setIsAdmin(true)
        else setIsAdmin(false)
      }
    })

    if(location.pathname === '/login'){
      loginLink.current.className = 'link-primary mx-2 fs-5'
      registerLink.current.className = 'link-light mx-2 fs-5'
      homeLink.current.className = 'link-light mx-2 fs-5'
    }
    if(location.pathname === '/register'){
      registerLink.current.className = 'link-primary mx-2 fs-5'
      loginLink.current.className = 'link-light mx-2 fs-5'
      homeLink.current.className = 'link-light mx-2 fs-5'
    }
    if(location.pathname === '/'){
      homeLink.current.className = 'link-primary mx-2 fs-5'
      loginLink.current.className = 'link-light mx-2 fs-5'
      registerLink.current.className = 'link-light mx-2 fs-5'
    }
  }, [location.pathname])

  const LoggedComponent = () => {
    return (
    <div className='d-flex flex-column justify-content-center align-items-center text-light mx-4'>
      <img role='button' alt='logout' src={LogoutIcon} onClick={() => {
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
          <Link ref={loginLink} className='link-light mx-2 fs-5' to='/login'>Login</Link>
          <Link ref={registerLink} className='link-light mx-2 fs-5' to='/register'>Register</Link>
          <Link ref={homeLink} className='link-light mx-2 fs-5' to='/'>Home</Link>
          {user === '' ? '' : <LoggedComponent />}
        </div>
      </div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route exact path='/' element={<Home logged={user} admin={isAdmin}/>} />
        <Route path='/Audi-A4' element={<CarRent />} />
        <Route path='/BMW-M3' element={<CarRent />} />
        <Route path='/Fiat-500' element={<CarRent />} />
      </Routes>
    </div>
  );
}

export default App;
