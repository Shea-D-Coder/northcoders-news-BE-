const db = require('../db/connection.js')

const checkExists = (table, column, value) => {
    return db.query(`SELECT * FROM ${table}
                     WHERE ${column} = $1`,
                     [value])
                     .then(({rows}) => { 
                        return rows.length > 0
                     })
                    }
module.exports = { checkExists }