
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
      allowNull: false,
      defaultValue: ''
    }
  }, {
    underscored: true
  });

  const TagCategory = TagCategoryModel(sequelize);
  
  Tag.belongsTo(TagCategory, { foreignKey: 'tag_category_id' });
  TagCategory.hasMany(Tag, { foreignKey: 'tag_category_id' });
  
  return Tag;

};

