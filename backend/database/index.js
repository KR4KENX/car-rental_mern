const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:admin@cluster0.dv4mqdv.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err))