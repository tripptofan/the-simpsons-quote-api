if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Quotes = require('./models/quotes')
const path = require('path')

app.use(express.static(__dirname + '/public'))
app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    next();
})

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to db'))




app.get('/quotes', async (req, res) => {
    try {
        const quotes = await Quotes.find({})
        res.send(quotes)
    } catch (err) {
       res.send(err)
    }
})

app.get('/random', async (req, res) => {
    let quotes = await Quotes.find({})
    let num = Math.floor(Math.random() * quotes.length)
    res.send(quotes[num])
})

app.listen(process.env.PORT || 3700)