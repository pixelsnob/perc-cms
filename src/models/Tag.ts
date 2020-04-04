

import { Model, Sequelize, DataTypes, BelongsToSetAssociationMixin } from "sequelize";
import TagCategoryModel from './TagCategory';
import { TagCategory } from "./TagCategory";

export class Tag extends Model {
  
  public id!: number;
  public name!: string;
  public tagCategory!: TagCategory;

  static associate: () => void;
  
  setTagCategory!: BelongsToSetAssociationMixin<TagCategory, number>;

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

