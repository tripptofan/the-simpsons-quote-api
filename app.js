if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Quotes = require('./models/quotes')
const path = require('path')

// app.use(express.static(__dirname + '/public'))
app.use(express.static(path.join(__dirname +'/client/build')))

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to db'))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build', 'index.html'))
})

app.get('/quotes', async (req, res) => {
    try {
        const quotes = await Quotes.find({})
        res.send(quotes)
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(process.env.PORT || 3700)