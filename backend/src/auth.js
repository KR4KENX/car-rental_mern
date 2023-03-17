const { Router } = require('express')
const User = require('../database/Schemas/User')
const { hashPassword, comparePassword } = require('../utils/helpers')
const passport = require('passport')

const router = Router()

router.get('/', async (req, res) => {
    if(req.session.userid){
        const userDB = await User.findOne({username: req.session.userid})
        if(userDB.isAdmin) res.send('admin')
        else res.send('user')
    }
    else res.sendStatus(400)
})

router.post('/login', passport.authenticate('local'), (req,res) => {
    res.sendStatus(200)
})

router.post('/register', async (req, res) => {
    const { username, password, secret } = req.body
    if(!username || !password) return res.sendStatus(400)

    const userDB = await User.findOne({ username })
    if(userDB) return res.sendStatus(400)
    else{
        if(secret === 'secrettokenforadmin'){
            await User.create({username: username, password: hashPassword(password), isAdmin: true})
        }
        else await User.create({username: username, password: hashPassword(password), isAdmin: false})
        res.sendStatus(201)
    }
})

module.exports = router