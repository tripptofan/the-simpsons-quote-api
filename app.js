if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient


app.use(express.static(__dirname + '/public'))


MongoClient.connect(process.env.DATABASE_URL, { 
    useUnifiedTopology: true,
    useNewUrlParser: true
 },
   
 (err, database) => {
    //...start the server
  
    app.get('/quotes', (req, res) => {
        database.collection('quotes').aggregate([{ $project: {_id: 0, quote: 1, character: 1, characterDirection: 1}}], (err, doc) => {
            res.setHeader('Content-Type', 'application/json')
            res.header("Access-Control-Allow-Origin", "*")
            res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type, Accept")

            res.send(doc)
            console.log(err)
        })


        
    })
    app.listen(process.env.PORT || 3030,  console.log('server is running'))
})

