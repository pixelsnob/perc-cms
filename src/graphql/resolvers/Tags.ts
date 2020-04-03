import { Tag } from "../../models/Tag";

module.exports = {

  Query: {
    findTags: (
      _: any,
      { offset, limit, order }: IFindAllInput,
      { dataSources }: { dataSources: any }
    ) => dataSources.Tags.findAll(offset, limit, order),
    findTagById: (
      _: any,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.Tags.findById(id)
  },
  
  Mutation: {
    addTag: (
      _: any,
      data: Tag,
      { dataSources }: { dataSources: any }
    ) => dataSources.Tags.add(data),
    updateTag: (
      _: any,
      { id, data }: { id: Number, data: Tag },
      { dataSources }: { dataSources: any }
    ) => dataSources.Tags.update(id, data),
    deleteTag: (
      _: any,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.Tags.remove(id),
    
  }

};
