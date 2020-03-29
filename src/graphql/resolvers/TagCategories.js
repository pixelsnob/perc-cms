
module.exports = {

  Query: {
    findTagCategories: (
      _,
      { offset, limit, order },
      { dataSources }
    ) => dataSources.TagCategories.findAll(offset, limit, order),
    findTagCategoryById: (
      _,
      { id },
      { dataSources }
    ) => dataSources.TagCategories.findById(id)
  },
  
  Mutation: {
    addTagCategory: (
      _,
      data,
      { dataSources }
    ) => dataSources.TagCategories.add(data),
    updateTagCategory: (
      _,
      data,
      { dataSources }
    ) => dataSources.TagCategories.update(data),
    deleteTagCategory: (
      _,
      id,
      { dataSources }
    ) => dataSources.TagCategories.remove(id),
    
  }

};
