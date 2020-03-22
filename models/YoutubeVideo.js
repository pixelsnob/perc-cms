
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
      type: Sequelize.INTEGER
    },
    end_time: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.TEXT
    },
  }, {
    underscored: true
  });
  
  return YoutubeVideo;
};


