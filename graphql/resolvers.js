
const resolvers = {

  Query: {
    products: (
      _,
      __,
      { dataSources }
    ) => dataSources.Products.getProducts(),
    product: (
      _,
      { id },
      { dataSources }
    ) => dataSources.Products.getProduct(id),
    productCategories: (
      _,
      __,
      { dataSources }
    ) => dataSources.ProductCategories.getProductCategories(),
    tags: (
      _,
      __,
      { dataSources }
    ) => dataSources.Tags.getTags()
  },
  
  Mutation: {
    addProduct: (
      _,
      data,
      { dataSources }
    ) => dataSources.Products.addProduct(data),
    addTag: (
      _,
      data,
      { dataSources }
    ) => dataSources.Tags.addTag(data)
  }
};

module.exports = resolvers;
