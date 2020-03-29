
module.exports = {

  Query: {
    findYoutubeVideos: (
      _,
      { offset, limit, order },
      { dataSources }
    ) => dataSources.YoutubeVideos.findAll(offset, limit, order),
    findYoutubeVideoById: (
      _,
      { id },
      { dataSources }
    ) => dataSources.YoutubeVideos.findById(id)
  },
  
  Mutation: {
    addYoutubeVideo: (
      _,
      data,
      { dataSources }
    ) => dataSources.YoutubeVideos.add(data),
    updateYoutubeVideo: (
      _,
      data,
      { dataSources }
    ) => dataSources.YoutubeVideos.update(data),
    deleteYoutubeVideo: (
      _,
      id,
      { dataSources }
    ) => dataSources.YoutubeVideos.remove(id),
    
  }

};
