import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Modal from './elements/Modal'
export default function AdminDashboard() {
    const [orders, setOrders] = useState()
    const [deletedOrder, setDeletedOrder] = useState()
    const [ordersCount, setOrdersCount] = useState(0)
    const [toggleCarDelete, setToggleCarDelete] = useState(false)
    const modal = useRef()
    
    useEffect(() => {
        const instance = axios.create({withCredentials: true})
        instance.get('http://localhost:8080/cars/admin').then((res) => {
            setOrders(res.data)

            let ordersNum = 0
            res.data.forEach((car) => {
                ordersNum += car.occupied.length
            })
            setOrdersCount(ordersNum)
        }).catch(err => {
            console.log(err)
        })
    }, [toggleCarDelete])

    const handleDelete = (e, carName, order) => {
        e.preventDefault()

        const dataObj = {
            order: order,
            car: carName
        }

        setDeletedOrder({car: carName, by: order.by, from: order.from, to: order.to})

        const instance = axios.create({withCredentials: true})
        instance.post('http://localhost:8080/cars/delete', dataObj).then((res) => {
            modalVisibilityHandler()
            setToggleCarDelete(!toggleCarDelete)
        }).catch(err => {
            console.log(err)
        })
    }

    const LastOrders = () => {
        return (
            <div className='d-flex flex-column'>
            {orders.map((car) => {
                return(
                    car.occupied.map((order, key) => {
                        return(
                            <div key={key} className='d-flex flex-row border align-items-center'>
                                <img className='w-25' src={car.img} alt='car-img'/>
                                <h4>{car.name.replace('-', ' ')}</h4>
                                <div className='d-flex flex-column border w-50 mx-auto'>
                                    <p>Rented by: <b>{order.by}</b></p>
                                    <p>From: <b>{new Date(order.from).toLocaleDateString().slice(0, 16)}</b> - To: <b>{new Date(order.to).toLocaleDateString().slice(0, 16)}</b></p>
                                </div>
                                <button onClick={(e) => handleDelete(e, car.name, order)} className='btn btn-danger mx-4'>X</button>
                            </div>
                        )
                    })
                )
            })}
            </div>
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

  return (
    <div className='container bg-light text-dark text-center p-4 position-relative'>
        <div ref={modal} id='invisible' className=' bg-danger w-50 text-dark p-3 text-center mx-auto mt-3 fixed-top shadow rounded'>
            {deletedOrder !== undefined ? <Modal action='Order deleted' car={deletedOrder.car} days='-' price='-' by={deletedOrder.by} from={deletedOrder.from} to={deletedOrder.to} /> : ''}
        </div>
      <h2>Admin dashboard</h2>
      <h4 className='my-3'>Orders: {ordersCount}</h4>
      {orders === undefined ? 'Loading' : <LastOrders />}
    </div>
  )
}
