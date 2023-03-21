import UserDashboard from '../components/UserDashboard'
import AdminDashboard from '../components/AdminDashboard'
import axios from 'axios'
import { useState, useEffect } from 'react'

function Home(props) {
  const [isAdmin, setIsAdmin] = useState()

  useEffect(() => {
    const instance = axios.create({withCredentials: true})
    instance.get('http://localhost:8080/auth').then((res) => {
      setIsAdmin(res.data.isAdmin)
    }).catch(err => {
        console.log(err)
    })
    }, [])
  return (
    <div>
      {props.logged === '' ? "You must be logged in to see this page" : isAdmin ? <AdminDashboard /> :<UserDashboard />}
    </div>
  )
}

export default Home
