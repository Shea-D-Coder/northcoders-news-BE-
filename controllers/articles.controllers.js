const {
  fetchAllArticles,  
} = require("../models/articles.models.js")

const getAllArticles = (request, response) =>{
    fetchAllArticles().then((articles)=> {
        response.status(200).send({articles})
    })
}

module.exports = { getAllArticles,
                  
}