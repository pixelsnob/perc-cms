import { TagCategory } from "../../models/TagCategory";

module.exports = {

  Query: {
    findTagCategories: (
      _: void,
      { offset, limit, order }: IFindAllInput,
      { dataSources }: { dataSources: any }
    ) => dataSources.TagCategories.findAll(offset, limit, order),
    findTagCategoryById: (
      _: void,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.TagCategories.findById(id)
  },
  
  Mutation: {
    addTagCategory: (
      _: void,
      data: TagCategory,
      { dataSources }: { dataSources: any }
    ) => dataSources.TagCategories.add(data),
    updateTagCategory: (
      _: void,
      { id, data }: { id: Number, data: TagCategory },
      { dataSources }: { dataSources: any }
    ) => dataSources.TagCategories.update(id, data),
    deleteTagCategory: (
      _: void,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.TagCategories.remove(id)
    
  }

};
