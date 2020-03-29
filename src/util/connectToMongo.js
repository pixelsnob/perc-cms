
const mongodb = require('mongodb');
const config = require('../config');

let connection;

module.exports = function(connectionString) {
  return new Promise(async function(resolve, reject) {
    try {
      if (connection) {
        return null;
      }

      const mongoClient = new mongodb.MongoClient(config.mongoDbConnectionString, {
        useNewUrlParser: true
      });
      
      mongoClient.connect(function(err) {
        if (err) {
          reject(err);
        }
        resolve(mongoClient);
      });

    } catch (e) {
      reject(e);
    }
  });
};



