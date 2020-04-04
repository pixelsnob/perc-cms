import { ProductCategory } from "../../models/ProductCategory";

module.exports = {

  Query: {
    findProductCategories: (
      _: void,
      { offset, limit, order }: IFindAllInput,
      { dataSources }: { dataSources: any }
    ) => dataSources.ProductCategories.findAll(offset, limit, order),
    findProductCategoryById: (
      _: void,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.ProductCategories.findById(id)
  },
  
  Mutation: {
    addProductCategory: (
      _: void,
      data: ProductCategory,
      { dataSources }: { dataSources: any }
    ) => dataSources.ProductCategories.add(data),
    updateProductCategory: (
      _: void,
      { id, data }: { id: Number, data: ProductCategory },
      { dataSources }: { dataSources: any }
    ) => dataSources.ProductCategories.update(id, data),
    deleteProductCategory: (
      _: void,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.ProductCategories.remove(id),
    
  }

};
