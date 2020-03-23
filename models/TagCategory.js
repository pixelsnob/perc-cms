
const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  
  return sequelize.define('TagCategory', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    underscored: true
  });

};

