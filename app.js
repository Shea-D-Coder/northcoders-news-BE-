const express = require('express')
const app = express()
const endpointsJson = require("./endpoints.json");
const { getApi } = require('./controllers/api.endpoints.controllers.js')
const { getAllTopics } = require('./controllers/topics.controllers.js');
const { getAllArticles } = require('./controllers/articles.controllers.js');
const { getAllUsers } = require('./controllers/users.controllers.js');


app.get('/api', getApi)

app.get('/api/topics', getAllTopics)

app.get('/api/articles', getAllArticles)

app.get("/api/users", getAllUsers)


module.exports = app