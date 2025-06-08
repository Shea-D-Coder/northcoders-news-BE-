const db = require('../db/connection.js');

const fetchAllUsers = () => {
     return db.query(`SELECT * FROM users`).then(({rows}) => {  
        console.log(rows, "<< rows in model") 
        return rows
    })
}

module.exports = { fetchAllUsers }