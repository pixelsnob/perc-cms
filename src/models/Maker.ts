import { Model, Sequelize, DataTypes } from "sequelize";

export default function(sequelize: Sequelize) {
  
  class Maker extends Model {
    //public id!: number;
  }

  Maker.init({
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

  return Maker;
};

