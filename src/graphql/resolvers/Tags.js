
module.exports = {

  Query: {
    findTags: (
      _,
      { offset, limit, order },
      { dataSources }
    ) => dataSources.Tags.findAll(offset, limit, order),
    findTagById: (
      _,
      { id },
      { dataSources }
    ) => dataSources.Tags.findById(id)
  },
  
  Mutation: {
    addTag: (
      _,
      data,
      { dataSources }
    ) => dataSources.Tags.add(data),
    updateTag: (
      _,
      data,
      { dataSources }
    ) => dataSources.Tags.update(data),
    deleteTag: (
      _,
      id,
      { dataSources }
    ) => dataSources.Tags.remove(id),
    
  }

};
