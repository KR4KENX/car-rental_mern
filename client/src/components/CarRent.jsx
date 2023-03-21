import { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Back from '../images/back.svg'
import axios from 'axios' 
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Modal from './elements/Modal'

function CarRent() {
    const [car, setCar] = useState()
    const location = useLocation()
    const navigate = useNavigate()
    const [reserveDate, setReserveDate] = useState()
    const [reservedDates, setReservedDates] = useState()
    const [toggleReservationMade, setToggleReservationMade] = useState(false)
    const [reservationConfirm, setReservationConfirm] = useState()
    const modal = useRef()

    useEffect(() => {
        const instance = axios.create({withCredentials: true})
        instance.get('http://localhost:8080/cars'+location.pathname).then((res) => {
            setCar(res.data[0])
            setReservedDates(getReservedDays(res.data[0].occupied))
        }).catch(err => {
        })
    }, [location.pathname, toggleReservationMade])

    const getReservedDays = (occupied) => {
        const occupiedDates = []
        occupied.forEach(reservation => {
            for(let i=0; i<=reservation.forDays; i++){
                occupiedDates.push(new Date(new Date(Date.parse(reservation.from) + (1000 * 3600 * 24 * i)).setHours(0)))
            }
        })
        return occupiedDates
    }

    const handleSubmit = (e) => {
         e.preventDefault()

        const dataObj = {
            car: location.pathname.slice(1),
            termFrom: String(new Date(reserveDate[0].setHours(0,0,0))),
            termTo: String(new Date(reserveDate[1].setHours(0,0,0)))
        }
        const instance = axios.create({withCredentials: true})
        instance.post('http://localhost:8080/cars/reserve', dataObj).then((res) => {
            modalVisibilityHandler()
            setReservationConfirm(res.data)
            setToggleReservationMade(!toggleReservationMade)
        }).catch(err => {
        })
    }

    const CalendarTile = () => {
        return (
            <>
            <Calendar value={reserveDate} onChange={setReserveDate} selectRange={true} tileDisabled={({activeStartDate, date, view}) => {
                for(let i=0; i<reservedDates.length; i++){
                    if(String(date) === String(reservedDates[i])){
                        return date
                    }
                }
            }} />
            <button onClick={(e) => handleSubmit(e)} className='btn btn-primary mt-3'>Reserve</button>
            </>
        )
    }

    const CarInfo = () => {
        return (
        <>
            <div className='d-flex flex-column align-items-center w-50'>
                <h2>{car.name.replace('-', ' ')}</h2>
                <p className='fs-3'>{car.price}$ / per day</p>
                <img className='w-50' src={car.img} alt='car-img'/>
            </div>
            <div className='d-flex flex-column align-items-center w-50'>
                {reservedDates === undefined ? 'Loading...' : <CalendarTile />}
            </div>
        </>
        )
    }

    const modalVisibilityHandler = () => {
        if(modal === null) return

        modal.current.style.transition = '.3s ease-in-out'
        modal.current.id = 'visible'
            setTimeout(() => {
                modal.current.id = 'invisible'
            }, 3500)
    }
    console.log(modal)
  return (
    <div className='container bg-light text-dark text-left p-3 position-relative'>
        <div ref={modal} id='invisible' className=' bg-warning w-50 text-dark p-3 text-center mx-auto mt-3 fixed-top shadow rounded'>
            {reservationConfirm !== undefined ? <Modal action={'Order confirmation'} car={reservationConfirm.car} days={reservationConfirm.days} price={reservationConfirm.price} from={reservationConfirm.from} to={reservationConfirm.to} /> : ''}
        </div>
        <div className='mt-4' role='button' onClick={() => navigate('/')}>
            <img src={Back} alt='back' />
            <span>Home</span>
        </div>
        <div className='d-flex flex-row'>
            {car === undefined ? 'Loading...' : <CarInfo />}
        </div>
    </div>
  )
}

export default CarRent
