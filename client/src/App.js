import { useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './pages/Login';
import Register from './pages/Register'
import Home from './pages/Home'

function App() {
  const [isLogged, setIsLogged] = useState(false)

  return (
    <div className='container'>
      <div className='d-flex flex-row justify-content-between align-items-center shadow p-3 mb-5 bg-dark rounded'>
        <h1 className='text-light'>RENT-CAR24.pl</h1>
        <div>
          <Link className='link-light mx-2 fs-5' to='/login'>Login</Link>
          <Link className='link-light mx-2 fs-5' to='/register'>Register</Link>
          <Link className='link-light mx-2 fs-5' to='/'>Home</Link>
        </div>
      </div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route exact path='/' element={<Home logged={isLogged} />} />

      </Routes>
    </div>
  );
}

export default App;
