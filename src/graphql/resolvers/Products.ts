import { Product } from "../../models/Product";

module.exports = {

  Query: {
    findProducts: (
      _: void,
      { offset, limit, order }: IFindAllInput,
      { dataSources }: { dataSources: any }
    ) => dataSources.Products.findAll(offset, limit, order),
    queryProducts: (
      _: void,
      { query, offset, limit, order }: IQueryInput,
      { dataSources }: { dataSources: any }
    ) => dataSources.Products.query(query, offset, limit, order),
    findProductById: (
      _: void,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.Products.findById(id)
  },
  
  Mutation: {
    addProduct: (
      _: void,
      data: Product,
      { dataSources }: { dataSources: any }
    ) => dataSources.Products.add(data),
    updateProduct: (
      _: void,
      { id, data }: { id: Number, data: Product },
      { dataSources }: { dataSources: any }
    ) => dataSources.Products.update(id, data),
    deleteProduct: (
      _: void,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.Products.remove(id),
    
  }

};
