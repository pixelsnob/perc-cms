import { TagCategory } from "../../models/TagCategory";

module.exports = {

  Query: {
    findTagCategories: (
      _: any,
      { offset, limit, order }: IFindAllInput,
      { dataSources }: { dataSources: any }
    ) => dataSources.TagCategories.findAll(offset, limit, order),
    findTagCategoryById: (
      _: any,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.TagCategories.findById(id)
  },
  
  Mutation: {
    addTagCategory: (
      _: any,
      data: NonAbstractTypeOfModel<TagCategory>,
      { dataSources }: { dataSources: any }
    ) => dataSources.TagCategories.add(data),
    updateTagCategory: (
      _: any,
      { id, data }: { id: Number, data: NonAbstractTypeOfModel<TagCategory> },
      { dataSources }: { dataSources: any }
    ) => dataSources.TagCategories.update(id, data),
    deleteTagCategory: (
      _: any,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.TagCategories.remove(id)
    
  }

};
