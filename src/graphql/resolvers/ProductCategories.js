
module.exports = {

  Query: {
    findProductCategories: (
      _,
      { offset, limit, order },
      { dataSources }
    ) => dataSources.ProductCategories.findAll(offset, limit, order),
    findProductCategoryById: (
      _,
      { id },
      { dataSources }
    ) => dataSources.ProductCategories.findById(id)
  },
  
  Mutation: {
    addProductCategory: (
      _,
      data,
      { dataSources }
    ) => dataSources.ProductCategories.add(data),
    updateProductCategory: (
      _,
      { id, data },
      { dataSources }
    ) => dataSources.ProductCategories.update(id, data),
    deleteProductCategory: (
      _,
      { id },
      { dataSources }
    ) => dataSources.ProductCategories.remove(id),
    
  }

};
