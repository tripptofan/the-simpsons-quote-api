const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({

    quote: {
        type: String,
        required: true
    },
    character: {
        type: String,
        required: true
    },
    characterDirection: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Quotes', quoteSchema)