
const SequelizeDatasource = require('../../util/SequelizeDatasource'); 

class YoutubeVideosDatasource extends SequelizeDatasource {
  
  reduce(youtubeVideo) {
    return {
      id: youtubeVideo.get('id'),
      name: youtubeVideo.get('name')
    };
  }
}

module.exports = YoutubeVideosDatasource;

