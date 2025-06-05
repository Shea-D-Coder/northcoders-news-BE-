const express = require('express')
const app = express()
const db = require('./db/connection.js')
const endpointsJson = require("./endpoints.json");


app.get('/api', (request, response) =>{
    response.status(200).send({endpoints: endpointsJson})
    //console.log(endpointsJson)  
    })

app.get('/api/topics', (request, response) =>{
    return db.query(`SELECT * FROM topics`).then(({rows}) => {
        response.status(200).send({topics: rows})
        console.log(rows)
    })
})



module.exports = app