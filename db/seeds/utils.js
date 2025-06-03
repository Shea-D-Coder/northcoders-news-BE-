const db = require("../../db/connection");


exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createLookupObject = (rows, key, value) => {
    const lookupObject = {}
    for(const obj of rows){
      lookupObject[obj[key]] = obj[value]
    }
    return lookupObject
}





