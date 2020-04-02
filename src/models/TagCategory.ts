
import { Model, Sequelize, DataTypes } from "sequelize";

export class TagCategory extends Model {
  public id!: number;
}

export default function(sequelize: Sequelize) {

  TagCategory.init({
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

  return TagCategory;
};

