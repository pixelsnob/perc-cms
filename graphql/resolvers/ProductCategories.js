
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
      data,
      { dataSources }
    ) => dataSources.ProductCategories.update(data),
    deleteProductCategory: (
      _,
      id,
      { dataSources }
    ) => dataSources.ProductCategories.remove(id),
    
  }

};
