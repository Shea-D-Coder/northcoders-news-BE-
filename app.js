const express = require('express')
const app = express()
const db = require('./db/connection.js')
const endpointsJson = require("./endpoints.json");


app.get('/api', (request, response) =>{
    response.status(200).send({endpoints: endpointsJson})  
    })

app.get('/api/topics', (request, response) =>{
    return db.query(`SELECT * FROM topics`).then(({rows}) => {
        response.status(200).send({topics: rows})
        
    })
})

app.get('/api/articles', (request, response) =>{
    return db.query(`SELECT 
      articles.author,
      articles.title,
      articles.article_id,
      articles.topic,
      articles.created_at,
      articles.votes,
      articles.article_img_url, 
        
     COUNT(comments.comment_id)::INT AS comment_count 
     FROM articles 
     LEFT JOIN comments ON comments.article_id = articles.article_id
     GROUP BY articles.article_id`).then(({rows}) => {
    response.status(200).send({articles: rows})
    console.log(rows)
    })
})


module.exports = app