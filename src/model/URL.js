const mongoose = require('mongoose')
const Schema = mongoose.Schema

const URL = new Schema({
    hash: {
        type: String
    },
    originURL: {
        type: String
    },
    shortURL: {
        type: String
    }
})

module.exports = mongoose.model('URL', URL)