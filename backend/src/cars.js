const { Router } = require('express')
const { isLogged } = require('../utils/helpers')

const Car = require('../database/Schemas/Car')
const User = require('../database/Schemas/User')

const router = Router()

router.get('/', async (req, res) => {
    const allCars = await Car.find()
    res.send(allCars)
})
//extract is logged to helper function
router.post('/create', async (req, res) => {
    if(!req.session.userid) return res.sendStatus(400)
    const user = await isLogged(req.session.userid)
    if(!user.isAdmin) return res.sendStatus(400)

    const { name, price} = req.body
    await Car.create({name, price})
    res.sendStatus(201)
})

module.exports = router