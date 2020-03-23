
const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  
  return sequelize.define('ProductCategory', {
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

