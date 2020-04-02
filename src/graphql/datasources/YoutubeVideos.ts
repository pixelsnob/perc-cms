
import SequelizeDatasource from '../../util/SequelizeDatasource'; 
import { YoutubeVideo } from '../../models/YoutubeVideo';

class YoutubeVideosDatasource extends SequelizeDatasource {
  
  reduce(youtubeVideo: YoutubeVideo) {
    return {
      id: youtubeVideo.get('id'),
      description: youtubeVideo.get('description'),
      youtube_id: youtubeVideo.get('youtube_id')
    };
  }
}

module.exports = YoutubeVideosDatasource;

