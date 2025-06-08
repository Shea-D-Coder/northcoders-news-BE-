const {
  fetchAllTopics,
  fetchAllArticles,
  fetchAllUsers 
} = require("../models/topics.models.js")



const getAllTopics = (request, response) => {
    fetchAllTopics().then((topics)=> {
        response.status(200).send({topics})
    })
}

const getAllArticles = (request, response) =>{
    fetchAllArticles().then((articles)=> {
        response.status(200).send({articles})
    })
}

const getAllUsers = (request, response) =>{
    fetchAllUsers().then((users)=> {
        response.status(200).send({users})
    })
}

module.exports = {getAllTopics,
                  getAllArticles,
                  getAllUsers
}