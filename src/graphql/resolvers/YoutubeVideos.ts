import { YoutubeVideo } from "../../models/YoutubeVideo";

module.exports = {

  Query: {
    findYoutubeVideos: (
      _: void,
      { offset, limit, order }: IFindAllInput,
      { dataSources }: { dataSources: any }
    ) => dataSources.YoutubeVideos.findAll(offset, limit, order),
    findYoutubeVideoById: (
      _: void,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.YoutubeVideos.findById(id)
  },
  
  Mutation: {
    addYoutubeVideo: (
      _: void,
      data: YoutubeVideo,
      { dataSources }: { dataSources: any }
    ) => dataSources.YoutubeVideos.add(data),
    updateYoutubeVideo: (
      _: void,
      { id, data }: { id: Number, data: YoutubeVideo },
      { dataSources }: { dataSources: any }
    ) => dataSources.YoutubeVideos.update(id, data),
    deleteYoutubeVideo: (
      _: void,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.YoutubeVideos.remove(id),
    
  }

};
