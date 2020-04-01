
import { Sequelize } from 'sequelize';

let connection: any;

module.exports = function(connectionString: string) {
  return new Promise(async function(resolve, reject) {
    if (connection) {
      resolve(connection);
      return null;
    }
    try {
      connection = new Sequelize(connectionString, {
        define: {
          charset: 'utf8'
        },
        //logging: false
      });
      await connection.authenticate();
      resolve(connection)
    } catch (e) {
      reject(e);
    }
  });
};

