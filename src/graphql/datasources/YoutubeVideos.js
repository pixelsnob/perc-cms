
import SequelizeDatasource from '../../util/SequelizeDatasource'; 

class YoutubeVideosDatasource extends SequelizeDatasource {
  
  reduce(youtubeVideo) {
    return {
      id: youtubeVideo.get('id'),
      description: youtubeVideo.get('description'),
      youtube_id: youtubeVideo.get('youtube_id')
    };
  }
}

module.exports = YoutubeVideosDatasource;

