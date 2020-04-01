

import { Model, Sequelize, DataTypes } from "sequelize";
import TagCategoryModel from './TagCategory';

export class Tag extends Model {
  //public id!: number;
  static associate: () => void;
}

export default function(sequelize: Sequelize) {
  
  Tag.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    underscored: true,
    sequelize
  });

  Tag.associate = function() {
    const TagCategory = TagCategoryModel(sequelize);
    
    Tag.belongsTo(TagCategory, { foreignKey: 'tag_category_id' });
    TagCategory.hasMany(Tag, { foreignKey: 'tag_category_id' });
  };

  return Tag;
};

