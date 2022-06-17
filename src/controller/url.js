const shortID = require('shortid')
const {config} = require('../config/mongoConnect')

function Connect(req, res) {
        const {originUrl} = req.body
        const hash = shortID.generate()
        const shortURL = `${config.API_URL}/${hash}`
        res.json({originUrl, hash, shortID})
}
