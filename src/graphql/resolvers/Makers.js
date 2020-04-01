
module.exports = {

  Query: {
    findMakers: (
      _,
      { offset, limit, order },
      { dataSources }
    ) => dataSources.Makers.findAll(offset, limit, order),
    findMakerById: (
      _,
      { id },
      { dataSources }
    ) => dataSources.Makers.findById(id)
  },
  
  Mutation: {
    addMaker: (
      _,
      data,
      { dataSources }
    ) => dataSources.Makers.add(data),
    updateMaker: (
      _,
      { id, data },
      { dataSources }
    ) => dataSources.Makers.update(id, data),
    deleteMaker: (
      _,
      { id },
      { dataSources }
    ) => dataSources.Makers.remove(id),
    
  }

};
