const db = require('../db/connection.js');

const fetchAllArticles = () => {
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
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC`).then(({rows}) => {
        return rows;
    })
}

const fetchArticlesById = (id) => {
     return db.query(`SELECT * FROM articles 
                      WHERE article_id = $1`, [id] )
     .then(({rows}) => { 
        if(!rows.length){
            return Promise.reject({ status: 404, msg: "Not Found"})
        }
        const article = rows[0]; 
        return article;
    })
}

const updateArticleVotesById = (article_id, inc_votes = 0)=>{
    if(typeof inc_votes !== "number"){
       return Promise.reject({ status: 400, msg: "Bad Request"}) 
    }
    return db.query(`UPDATE articles
                     SET votes = votes + $1
                     WHERE article_id = $2 
                     RETURNING *;`,[inc_votes, article_id ])
        .then(({rows}) => { 
        if(!rows.length){
            return Promise.reject({ status: 404, msg: "Not Found"})
        }
        const article = rows[0]; 
        return article;
    })
    }

module.exports = { fetchAllArticles, 
                   fetchArticlesById, 
                   updateArticleVotesById }