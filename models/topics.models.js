const db = require('../db/connection.js');

const fetchAllTopics = () => {
     return db.query(`SELECT * FROM topics`).then(({rows}) => {  
        return rows
    })
}

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
        return rows
    })
}

const fetchAllUsers = () => {
     return db.query(`SELECT * FROM users`).then(({rows}) => {  
        console.log(rows, "<< rows in model") 
        return rows
    })
}
module.exports = {fetchAllTopics,
                  fetchAllArticles,
                  fetchAllUsers
}