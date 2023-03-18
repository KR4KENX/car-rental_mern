const bcrypt = require('bcryptjs')
const User = require('../database/Schemas/User')

function hashPassword(password){
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
}

function comparePassword(raw, hashed){
    return bcrypt.compareSync(raw, hashed)
}

async function isLogged(passport){
    if(passport === undefined) return false
    const user = await User.findById(passport.user)
    if(!user) return false
    else return user
}

module.exports = {
    hashPassword,
    comparePassword,
    isLogged
}