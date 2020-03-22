
const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  
  return sequelize.define('Maker', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    underscored: true
  });

};

