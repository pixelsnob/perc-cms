
const Sequelize = require('sequelize');

let sequelize: typeof Sequelize;

module.exports = function(connectionString: string) {
  return new Promise(async function(resolve, reject) {
    if (sequelize) {
      resolve(sequelize);
      return null;
    }
    try {
      sequelize = new Sequelize(connectionString, {
        define: {
          charset: 'utf8'
        },
        //logging: false
      });
      await sequelize.authenticate();
      resolve(sequelize)
    } catch (e) {
      reject(e);
    }
  });
};

