const express = require('express')
const app = express()
const db = require('./db/connection.js')
const endpointsJson = require("./endpoints.json");


app.get('/api', (request, response) =>{
    response.status(200).send({endpoints: endpointsJson})
    console.log(endpointsJson)  
    })
    

module.exports = app