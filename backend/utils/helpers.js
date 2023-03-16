const bcrypt = require('bcryptjs')
const User = require('../database/Schemas/User')

function hashPassword(password){
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
}

function comparePassword(raw, hashed){
    return bcrypt.compareSync(raw, hashed)
}

async function isLogged(username){
    const userDB = await User.findOne({ username })
    if(userDB) return userDB
    else return false
}

module.exports = {
    hashPassword,
    comparePassword,
    isLogged
}