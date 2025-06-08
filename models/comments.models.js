const db = require('../db/connection.js');

const fetchCommentsByArticleId = (id) => {
     return db.query(`SELECT * FROM articles 
                      WHERE article_id = $1`, [id] )
     .then(({rows}) => { 
        if(rows.length === 0){
            return Promise.reject({ status: 404, msg: "Not Found"})
        }
        return db.query(`SELECT comment_id, votes, created_at, author, body, article_id
        FROM comments 
        WHERE article_id = $1`,[id])
     })
     .then(({rows}) =>{
        return rows;
     }); 
}

    module.exports = {fetchCommentsByArticleId}