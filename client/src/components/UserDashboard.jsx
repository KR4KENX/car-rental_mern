import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function UserDashboard() {
    const [cars, setCars] = useState()
    
    useEffect(() => {
        const instance = axios.create({withCredentials: true})
        instance.get('http://localhost:8080/cars').then((res) => {
            setCars(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    const CarsList = () => {
        return (
            <>
                <h1>Ours cars</h1>
                <div className='d-flex flex-row align-items-baseline justify-content-center my-3 p-2'>
                {cars.map((car, key) => {
                    return(
                    <div key={key} className='d-flex flex-column align-items-center'>
                        <h2>{car.name.replace('-', ' ')}</h2>
                        <img className='w-50' src={car.img} alt='car-img' />
                        <p className='fs-4'>Price: <b>{car.price}$</b></p>
                        <button className='btn btn-primary w-25'><Link className='link-light' to={'/'+car.name.replace(' ','-')}>Rent</Link></button>
                    </div>
                    )
                })}
                </div>
            </>
        )
    }
  return (
    <div className='container bg-light text-dark text-center p-4'>
      {cars === undefined ? 'Loading...' : <CarsList />}
    </div>
  )
}

export default UserDashboard
