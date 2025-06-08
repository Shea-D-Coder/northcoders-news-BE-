const {
  fetchAllArticles, 
  fetchArticlesById
} = require("../models/articles.models.js");

const getAllArticles = (request, response) =>{
    fetchAllArticles().then((articles)=> {
        response.status(200).send({articles});
    });
}

const getArticlesById = (request, response) =>{
  const {article_id} = request.params;
  fetchArticlesById(article_id).then((article)=> {
    response.status(200).send({article: article});
    });
}

module.exports = { getAllArticles, 
                   getArticlesById
                 }