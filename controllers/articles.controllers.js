const {
  fetchAllArticles, 
  fetchArticlesById,
  updateArticleVotesById
} = require("../models/articles.models.js");

const getAllArticles = (request, response) =>{
    fetchAllArticles().then((articles)=> {
        response.status(200).send({articles});
    });
};

const getArticlesById = (request, response, next) =>{
  const {article_id} = request.params;
  
  fetchArticlesById(article_id)
  .then((article)=> {
    response.status(200).send({article: article});
    })
    .catch((err) => {
      next(err)
    });
};

const patchArticleById= (request, response, next) =>{
  const {article_id} = request.params;
  const {inc_votes} = request.body

  updateArticleVotesById(article_id, inc_votes)
  .then((updateArticle)=> {
    response.status(200).send({article: updateArticle});
    })
    .catch((err) => {
      next(err)
    });}


module.exports = { getAllArticles, 
                   getArticlesById,
                   patchArticleById
                 }