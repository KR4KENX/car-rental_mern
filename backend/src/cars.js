const { Router } = require('express')
const { isLogged } = require('../utils/helpers')

const Car = require('../database/Schemas/Car')

const router = Router()

router.get('/', async (req, res) => {
    const user = await isLogged(req.session.passport)
    if(!user) return res.sendStatus(400)

    const allCars = await Car.find()
    const carsToSend = []
    allCars.forEach(car => {
        if(car.occupied.length > 0){
            const occupations = []
            car.occupied.forEach(occupation => {
                occupations.push({from: occupation.from, to: occupation.to})
            })
            carsToSend.push({_id: car._id, name: car.name, price: car.price, occupied: occupations})
        }
        else{
            carsToSend.push(car)
        }
    })
    res.send(carsToSend)
})

router.get('/admin', async (req, res) => {
    const user = await isLogged(req.session.passport)
    if(!user.isAdmin) return res.sendStatus(400)

    const allCars = await Car.find()
    
    res.send(allCars)
})

router.get('/:name', async (req, res) => {
    const user = await isLogged(req.session.passport)
    if(!user) return res.sendStatus(400)

    const car = await Car.findOne({name: req.params.name})
    res.send(car)
})

router.post('/reserve', async (req, res) => {
    const user = await isLogged(req.session.passport)
    if(!user) return res.sendStatus(400)

    const { car, termFrom, termTo } = req.body
    const carDB = await Car.findOne({ name: car })

    await carDB.updateOne({$push: {occupied: {from: termFrom, to: termTo, by: user.username}}})

    const days = Math.ceil((Date.parse(termTo) - Date.parse(termFrom)) / (1000 * 3600 * 24))
    const carPrice = days * carDB.price

    const reservationInfo = {
        days: days,
        car: car,
        price: carPrice
    }
    res.send(reservationInfo)
})

router.post('/create', async (req, res) => {
    const user = await isLogged(req.session.passport)
    if(!user.isAdmin) return res.sendStatus(400)

    const { name, price} = req.body
    await Car.create({name, price})
    res.sendStatus(201)
})

module.exports = router