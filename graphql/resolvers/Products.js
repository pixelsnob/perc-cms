
module.exports = {

  Query: {
    findProducts: (
      _,
      { offset, limit, order },
      { dataSources }
    ) => dataSources.Products.findAll(offset, limit, order),
    queryProducts: (
      _,
      { query, offset, limit, order },
      { dataSources }
    ) => dataSources.Products.query(query, offset, limit, order),
    findProductById: (
      _,
      { id },
      { dataSources }
    ) => dataSources.Products.findById(id)
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
    
  }

};
