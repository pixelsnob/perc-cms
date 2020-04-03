import { Maker } from "../../models/Maker";

module.exports = {

  Query: {
    findMakers: (
      _: any,
      { offset, limit, order }: IFindAllInput,
      { dataSources }: { dataSources: any }
    ) => dataSources.Makers.findAll(offset, limit, order),
    findMakerById: (
      _: any,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.Makers.findById(id)
  },
  
  Mutation: {
    addMaker: (
      _: any,
      data: Maker,
      { dataSources }: { dataSources: any }
    ) => dataSources.Makers.add(data),
    updateMaker: (
      _: any,
      { id, data }: { id: Number, data: Maker },
      { dataSources }: { dataSources: any }
    ) => dataSources.Makers.update(id, data),
    deleteMaker: (
      _: any,
      { id }: { id: Number },
      { dataSources }: { dataSources: any }
    ) => dataSources.Makers.remove(id),
    
  }

};
