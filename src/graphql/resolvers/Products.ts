import { Product } from "../../models/Product";

module.exports = {

  Query: {
    findProducts: (
      _: any,
      { offset, limit, order }: IFindAllInput,
      { dataSources }: { dataSources: any }
    ) => dataSources.Products.findAll(offset, limit, order),
    queryProducts: (
      _: any,
      { query, offset, limit, order }: IQueryInput,
      { dataSources }: { dataSources: any }
    ) => dataSources.Products.query(query, offset, limit, order),
    findProductById: (
      _: any,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.Products.findById(id)
  },
  
  Mutation: {
    addProduct: (
      _: any,
      data: NonAbstractTypeOfModel<Product>,
      { dataSources }: { dataSources: any }
    ) => dataSources.Products.add(data),
    updateProduct: (
      _: any,
      { id, data }: { id: Number, data: NonAbstractTypeOfModel<Product> },
      { dataSources }: { dataSources: any } ////
    ) => dataSources.Products.update(id, data),
    deleteProduct: (
      _: any,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.Products.remove(id),
    
  }

};
