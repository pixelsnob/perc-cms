import { ProductCategory } from "../../models/ProductCategory";

module.exports = {

  Query: {
    findProductCategories: (
      _: any,
      { offset, limit, order }: IFindAllInput,
      { dataSources }: { dataSources: any }
    ) => dataSources.ProductCategories.findAll(offset, limit, order),
    findProductCategoryById: (
      _: any,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.ProductCategories.findById(id)
  },
  
  Mutation: {
    addProductCategory: (
      _: any,
      data: NonAbstractTypeOfModel<ProductCategory>,
      { dataSources }: { dataSources: any }
    ) => dataSources.ProductCategories.add(data),
    updateProductCategory: (
      _: any,
      { id, data }: { id: Number, data: NonAbstractTypeOfModel<ProductCategory> },
      { dataSources }: { dataSources: any }
    ) => dataSources.ProductCategories.update(id, data),
    deleteProductCategory: (
      _: any,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.ProductCategories.remove(id),
    
  }

};
