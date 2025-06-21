const express = require('express')
const app = express()
const { getApi } = require('./controllers/api.endpoints.controllers.js')
const { getAllTopics } = require('./controllers/topics.controllers.js');
const { getAllArticles, 
        getArticlesById,
        patchArticleById
      } = require('./controllers/articles.controllers.js');

const { getAllUsers } = require('./controllers/users.controllers.js');

const { getCommentsByArticleId, 
        postCommentsByArticleId
      } = require("./controllers/comments.controllers.js");

const {handlePostgresErrors,
       handleCustomErrors
      } = require('./errors.js');

app.use(express.json())

app.get("/api", getApi)

app.get("/api/topics", getAllTopics)

app.get("/api/articles", getAllArticles)

app.get("/api/users", getAllUsers)

app.get("/api/articles/:article_id", getArticlesById)

app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.post("/api/articles/:article_id/comments", postCommentsByArticleId)  
      
app.patch("/api/articles/:article_id", patchArticleById)

app.use(handlePostgresErrors);

app.use(handleCustomErrors);



module.exports = app
