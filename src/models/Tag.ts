

import { Model, Sequelize, DataTypes, HasManySetAssociationsMixin } from "sequelize";
import TagCategoryModel from './TagCategory';
import { TagCategory } from "./TagCategory";

export class Tag extends Model {
  public id!: number;
  
  static associate: () => void;
  static setTagCategory: HasManySetAssociationsMixin<typeof TagCategory, number>;

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

