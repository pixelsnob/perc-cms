
import { MongoClient } from "mongodb";

let connection: MongoClient;

module.exports = function(connectionString: string) {
  return new Promise(async function(resolve, reject) {
    try {
      if (connection) {
        return null;
      }

      connection = new MongoClient(connectionString, {
        useNewUrlParser: true
      });
      
      connection.connect(function(err: Error) {
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



