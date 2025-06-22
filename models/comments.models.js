const db = require('../db/connection.js');
const comments = require('../db/data/test-data/comments.js');

const fetchCommentsByArticleId = (id) => {
     return db.query(`SELECT * FROM articles 
                      WHERE article_id = $1`, 
                      [id] )
     .then(({rows}) => { 
        if(rows.length === 0){
            return Promise.reject({ status: 404, msg: "Not Found"})
        }
        return db.query(`SELECT comment_id, votes, created_at, author, body, article_id
                         FROM comments 
                         WHERE article_id = $1 
                         ORDER BY comments.created_at DESC`,
                         [id])     
      })
     .then(({rows}) =>{
        return rows;
      }); 
}

const insertCommentsByArticleId = (article_id, username, body) => {
   return db.query(`INSERT INTO comments (article_id, author, body) 
                    VALUES($1, $2, $3) 
                    RETURNING *`,
                    [article_id, username, body])
                    .then(({rows}) =>{
                     return rows[0] 
                  })
}

const removeCommentById = (comment_id) => {
   return db.query(
     `DELETE FROM comments
      WHERE comment_id = $1
      RETURNING *`, 
      [comment_id])
       .then(({rows}) => { 
        if(!rows.length){
            return Promise.reject({ status: 404, msg: "Not Found"})
        }
        const comment = rows[0]; 
        return comment;
    }) 
}

    module.exports = {fetchCommentsByArticleId, 
                      insertCommentsByArticleId,
                      removeCommentById}