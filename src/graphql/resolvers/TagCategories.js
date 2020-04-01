
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
      { id, data },
      { dataSources }
    ) => dataSources.TagCategories.update(id, data),
    deleteTagCategory: (
      _,
      { id },
      { dataSources }
    ) => dataSources.TagCategories.remove(id)
    
  }

};
