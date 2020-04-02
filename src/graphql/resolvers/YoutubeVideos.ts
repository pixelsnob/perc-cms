import { YoutubeVideo } from "../../models/YoutubeVideo";

module.exports = {

  Query: {
    findYoutubeVideos: (
      _: any,
      { offset, limit, order }: IFindAllInput,
      { dataSources }: { dataSources: any }
    ) => dataSources.YoutubeVideos.findAll(offset, limit, order),
    findYoutubeVideoById: (
      _: any,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.YoutubeVideos.findById(id)
  },
  
  Mutation: {
    addYoutubeVideo: (
      _: any,
      data: NonAbstractTypeOfModel<YoutubeVideo>,
      { dataSources }: { dataSources: any }
    ) => dataSources.YoutubeVideos.add(data),
    updateYoutubeVideo: (
      _: any,
      { id, data }: { id: Number, data: NonAbstractTypeOfModel<YoutubeVideo> },
      { dataSources }: { dataSources: any }
    ) => dataSources.YoutubeVideos.update(id, data),
    deleteYoutubeVideo: (
      _: any,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.YoutubeVideos.remove(id),
    
  }

};
