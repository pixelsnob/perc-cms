import { Tag } from "../../models/Tag";

module.exports = {

  Query: {
    findTags: (
      _: void,
      { offset, limit, order }: IFindAllInput,
      { dataSources }: { dataSources: any }
    ) => dataSources.Tags.findAll(offset, limit, order),
    findTagById: (
      _: void,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.Tags.findById(id)
  },
  
  Mutation: {
    addTag: (
      _: void,
      data: Tag,
      { dataSources }: { dataSources: any }
    ) => dataSources.Tags.add(data),
    updateTag: (
      _: void,
      { id, data }: { id: Number, data: Tag },
      { dataSources }: { dataSources: any }
    ) => dataSources.Tags.update(id, data),
    deleteTag: (
      _: void,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.Tags.remove(id),
    
  }

};
