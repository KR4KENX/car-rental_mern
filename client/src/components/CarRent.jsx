import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Back from '../images/back.svg'
import axios from 'axios' 
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

function CarRent() {
    const [car, setCar] = useState()
    const location = useLocation()
    const navigate = useNavigate()
    const [date, setDate] = useState()

    useEffect(() => {
        const instance = axios.create({withCredentials: true})
        instance.get('http://localhost:8080/cars'+location.pathname).then((res) => {
            console.log(res)
            setCar(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    const CarInfo = () => {
        return (
        <>
            <div className='d-flex flex-column align-items-center'>
                <h1>{car.name}</h1>
                <p className='fs-2'>{car.price}$</p>
                <img className='w-50' src={car.img} alt='car-img'/>
            </div>
            <div className='d-flex flex-column align-items-center'>
                <Calendar value={date} onChange={setDate} selectRange={true} tileDisabled={({activeStartDate, date, view}) => {
                    return date == 'Fri Mar 24 2023 00:00:00 GMT+0100 (Central European Standard Time)'
                }} />
                <button className='btn btn-primary mt-3'>Reserve</button>
            </div>
        </>
        )
    }
  return (
    <div className='container bg-light text-dark text-left p-3'>
        <div role='button' onClick={() => navigate('/')}>
            <img src={Back} />
            <span>Home</span>
        </div>
        <div className='d-flex flex-row'>
            {car === undefined ? 'Loading...' : <CarInfo />}
            
        </div>
    </div>
  )
}

export default CarRent
