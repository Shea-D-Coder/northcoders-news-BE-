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
     return db.query(`SELECT * FROM articles WHERE article_id = $1`, [id] )
     .then(({rows}) => { 
        const article = rows[0]; 
        return article;
    })
}

module.exports = { fetchAllArticles, fetchArticlesById }