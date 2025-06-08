const express = require('express')
const app = express()
const endpointsJson = require("./endpoints.json");
const { getApi } = require('./controllers/api.endpoints.controllers.js')
const { getAllTopics } = require('./controllers/topics.controllers.js');
const { getAllArticles, 
        getArticlesById
      } = require('./controllers/articles.controllers.js');
const { getAllUsers } = require('./controllers/users.controllers.js');
const { getCommentsByArticleId
} = require("./controllers/comments.controllers.js");
const {handlePostgresErrors,
       handleCustomErrors
      } = require('./errors.js');


app.get("/api", getApi)

app.get("/api/topics", getAllTopics)

app.get("/api/articles", getAllArticles)

app.get("/api/users", getAllUsers)

app.get("/api/articles/:article_id", getArticlesById)

app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.use(handlePostgresErrors);

app.use(handleCustomErrors);



module.exports = app
