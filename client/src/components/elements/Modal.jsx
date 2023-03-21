import React from 'react'

function Modal(props) {
    const fromToPresent = String(new Date(props.from).toLocaleDateString()).slice(0, 16)
    const toToPresent = String(new Date(props.to).toLocaleDateString()).slice(0, 16)
    return (
        <>
        <h1>{props.action}</h1>
        <div className='d-flex flex-row justify-content-around gap-3'>
            <p>Your car: <br></br><span className='fs-4'>{props.car.replace('-', ' ')}</span></p>
            {props.action === 'Order deleted' ?
            <>
                <p>By: <br></br> <span className='fs-4'>{props.by}</span></p>
            </>
            : 
            <>
                <p>Reserved for: <br></br><span className='fs-4'>{props.days} days</span></p>
                <p>Price: <br></br><span className='fs-4'>{props.price} $</span></p>
            </>}
        </div>
        <span>From <b>{fromToPresent}</b> - To <b>{toToPresent}</b></span>
        </>
    )
}

export default Modal
