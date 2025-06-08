const {fetchAllTopics } = require("../models/topics.models.js")



const getAllTopics = (request, response) => {
    fetchAllTopics().then((topics)=> {
        response.status(200).send({topics})
    })
}

module.exports = { getAllTopics }