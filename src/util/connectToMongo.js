
const mongodb = require('mongodb');
const config = require('../config');

let connection; /////////////

module.exports = function(connectionString) {
  return new Promise(async function(resolve, reject) {
    try {
      if (connection) {
        return null;
      }

      connection= new mongodb.MongoClient(connectionString, {
        useNewUrlParser: true
      });
      
      connection.connect(function(err) {
        if (err) {
          reject(err);
        }
        resolve(connection);
      });
      
    } catch (e) {
      reject(e);
    }
  });
};



