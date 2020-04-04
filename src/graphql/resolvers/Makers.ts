import { Maker } from "../../models/Maker";

module.exports = {

  Query: {
    findMakers: (
      _: void,
      { offset, limit, order }: IFindAllInput,
      { dataSources }: { dataSources: any }
    ) => dataSources.Makers.findAll(offset, limit, order),
    findMakerById: (
      _: void,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.Makers.findById(id)
  },
  
  Mutation: {
    addMaker: (
      _: void,
      data: Maker,
      { dataSources }: { dataSources: any }
    ) => dataSources.Makers.add(data),
    updateMaker: (
      _: void,
      { id, data }: { id: Number, data: Maker },
      { dataSources }: { dataSources: any }
    ) => dataSources.Makers.update(id, data),
    deleteMaker: (
      _: void,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.Makers.remove(id),
    
  }

};
