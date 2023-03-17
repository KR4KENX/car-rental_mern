const passport = require('passport')
const { Strategy } = require('passport-local')
const User = require('../database/Schemas/User')
const { comparePassword } = require('../utils/helpers')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        if(!user) throw new Error('User not found')
        done(null, user)
    } catch(err) {
        done(err, null)
    }
})

passport.use(
    new Strategy({
        usernameField: 'username',
    }, async (username, password, done) => {
        try{
            if(!username || !password) {
                throw new Error('Missing data')
            }

            const userDB = await User.findOne({ username })
            if(!userDB) throw new Error('Invalid data')

            const isValid = comparePassword(password, userDB.password)
            if(isValid){ 
                done(null, userDB)
            }
            else{
                done(null, null)
            }
        }catch(err){
            done(err, null)
        }
    })
)