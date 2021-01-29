if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const Quotes = require('./models/quotes')

app.use(express.static('public'))
app.use(expressLayouts)
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to db'))




app.get('/', async (req, res) => {
    res.render('index')
})

app.get('/quotes', async (req, res) => {
    try {
        const quotes = await Quotes.find({})
        res.send(quotes)
    } catch (err) {
        console.error(message.err)
    }
})





app.listen(process.env.PORT || 3700)