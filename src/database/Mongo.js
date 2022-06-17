const {MONGO_CONNECT}  = require('../config/mongoConnect')
const mongoose = require('mongoose')

const mongoConnect = async () => {
    mongoose.Promise = global.Promise
    try{
       await mongoose.connect(MONGO_CONNECT)
       console.log("DATABASE conectado")
    }
    catch(err){
        console.log(`ERRO ao se conectar${err}`)
    }
}

module.exports = mongoConnect()