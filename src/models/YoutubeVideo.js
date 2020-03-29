
const Sequelize = require('sequelize');

module.exports = function(sequelize) {

  const YoutubeVideo = sequelize.define('YoutubeVideo', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    youtube_id: {
      type: Sequelize.STRING,
      allowNull: false
    },
    start_time: {
      type: Sequelize.INTEGER,
      //allowNull: false,
      //defaultValue: 0
    },
    end_time: {
      type: Sequelize.INTEGER,
      //allowNull: false,
      defaultValue: 0
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
  }, {
    underscored: true
  });
  
  return YoutubeVideo;
};


