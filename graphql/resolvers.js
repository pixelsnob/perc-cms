
const resolvers = {

  Query: {
    findProducts: (
      _,
      { offset, limit, order },
      { dataSources }
    ) => dataSources.Products.findAll(offset, limit, order),
    queryProducts: (
      _,
      { offset, limit, query, order },
      { dataSources }
    ) => dataSources.Products.query(query, offset, limit, order),
    findProductById: (
      _,
      { id },
      { dataSources }
    ) => dataSources.Products.findById(id),
    findProductCategoryById: (
      _,
      { id },
      { dataSources }
    ) => dataSources.ProductCategories.findById(id),
    findTagById: (
      _,
      { id },
      { dataSources }
    ) => dataSources.Tags.findById(id),
    
  },
  
  Mutation: {
    addProduct: (
      _,
      data,
      { dataSources }
    ) => dataSources.Products.add(data),
    updateProduct: (
      _,
      data,
      { dataSources }
    ) => dataSources.Products.update(data),
    deleteProduct: (
      _,
      id,
      { dataSources }
    ) => dataSources.Products.remove(id),
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
  },

  // MutationResponse: {
  //   __resolveType(mutationResponse, context, info) {
  //     return null;
  //   },
  // }

};

module.exports = resolvers;
