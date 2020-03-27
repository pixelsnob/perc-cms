
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
    findProductCategories: (
      _,
      __,
      { dataSources }
    ) => dataSources.ProductCategories.findProductCategories(),
    findTags: (
      _,
      __,
      { dataSources }
    ) => dataSources.Tags.findTags()
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
    addTag: (
      _,
      data,
      { dataSources }
    ) => dataSources.Tags.addTag(data)
  },

  // MutationResponse: {
  //   __resolveType(mutationResponse, context, info) {
  //     return null;
  //   },
  // }

};

module.exports = resolvers;
