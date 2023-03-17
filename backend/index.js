const express = require('express')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')


const authRouter = require('./src/auth')
const carsRouter = require('./src/cars')

require('./database/index')
require('./strategies/local')

const app = express()
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
app.use(express.json())
app.use(session({
    secret: 'somerandomdataforhasvkzjoqmw',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: 'mongodb+srv://admin:admin@cluster0.dv4mqdv.mongodb.net/?retryWrites=true&w=majority'})
}))

app.use(passport.initialize())
app.use(passport.session())


app.use('/auth', authRouter)
app.use('/cars', carsRouter)

app.listen(8080, () => {
    console.log('server running on 8080')
})