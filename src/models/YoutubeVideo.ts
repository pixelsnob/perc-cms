
import { Model, Sequelize, DataTypes } from "sequelize";

export default function(sequelize: Sequelize) {
  
  class YoutubeVideo extends Model {
    public id!: number;
  }

  YoutubeVideo.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    youtube_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_time: {
      type: DataTypes.INTEGER,
      //allowNull: false,
      //defaultValue: 0
    },
    end_time: {
      type: DataTypes.INTEGER,
      //allowNull: false,
      defaultValue: 0
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    underscored: true,
    sequelize
  });

  return YoutubeVideo;
};

