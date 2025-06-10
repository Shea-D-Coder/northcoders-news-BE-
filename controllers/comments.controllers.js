const { fetchCommentsByArticleId,
        insertCommentsByArticleId
      } = require("../models/comments.models.js");


const getCommentsByArticleId = (request, response, next) =>{
  const {article_id} = request.params;
  fetchCommentsByArticleId(article_id).then((comments)=> {
    response.status(200).send({comments: comments});
    })
    .catch((err) => {
      next(err)
    });
};

const postCommentsByArticleId = (request, response, next) =>{
  const {article_id} = request.params;
  const {username, body} = request.body;
  insertCommentsByArticleId(article_id, username, body).then((comment)=> {
    response.status(201).send({comment});
    })
    .catch((err) => {
      console.log(err)
      next(err)
    });
};

module.exports = {getCommentsByArticleId, postCommentsByArticleId}