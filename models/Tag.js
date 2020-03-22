
const Sequelize = require('sequelize');
const TagCategoryModel = require('./TagCategory');

module.exports = function(sequelize) {
  
  const Tag = sequelize.define('Tag', {
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

  const TagCategory = TagCategoryModel(sequelize);
  
  Tag.belongsTo(TagCategory);
  TagCategory.hasMany(Tag);
  
  return Tag;

};

