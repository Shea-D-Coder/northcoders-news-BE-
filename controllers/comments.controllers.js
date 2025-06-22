const { fetchCommentsByArticleId,
        insertCommentsByArticleId,
        removeCommentById
      } = require("../models/comments.models.js");


const getCommentsByArticleId = (request, response, next) =>{
  const {article_id} = request.params;

  fetchCommentsByArticleId(article_id)
  .then((comments)=> {
    response.status(200).send({comments: comments});
    })
    .catch((err) => {
      next(err)
    });
};

const postCommentsByArticleId = (request, response, next) =>{
  const {article_id} = request.params;
  const {username, body} = request.body;

  insertCommentsByArticleId(article_id, username, body)
  .then((comment)=> {
    response.status(201).send({comment});
    })
    .catch((err) => {
      next(err)
    });
};

const deleteCommentById = (request, response, next) =>{
  const {comment_id} = request.params;

  removeCommentById(comment_id)
  .then(()=> {
    response.status(204).send();
    })
    .catch((err) => {
      next(err)
    });
}
module.exports = {getCommentsByArticleId, 
                  postCommentsByArticleId,
                  deleteCommentById}