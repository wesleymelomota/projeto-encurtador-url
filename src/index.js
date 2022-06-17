const  express  = require('express')
const shortID = require('shortid')
const {API_URL, MONGO_CONNECT} = require('./config/mongoConnect')
const api = express()
const {MongoClient, ServerApiVersion} = require('mongodb')
const mongoose = require('mongoose')
require('./model/URL')
const URL = mongoose.model('URL')


mongoose.connect(MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }).then(() => console.log('Conectado ao database com sucesso!')).catch((err) => {
    console.log(`Erro ao se conectar: ${err}`)
})

api.use(express.json())

api.get('/:hash', async (req, res) => {
    const {hash} = req.params
    const url = await URL.findOne({hash})
    
    if (url){
        res.redirect(url.originURL)
        return
    } 
    res.status(400).json({ERRO: "URL não encontrada!"})
})

api.post('/encurtar', async (req, res)  => {
    const {originURL} = req.body
    const url = await URL.findOne({originURL})

    if (url){
        res.json({originURL})
    }else {

        const hash = shortID.generate()
        const shortURL = `${API_URL}/${hash}`
    
        //criando no database
        new URL({hash, originURL, shortURL}).save().then(() => {
            console.log('salvo com sucesso')
        }).catch((err) => {
            console.log(`erro ao salvar ${err}`)
        })
        res.json({originURL, hash, shortURL})
    }
})

api.listen(5000, () => console.log("server rodando"))