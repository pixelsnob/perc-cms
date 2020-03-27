
const { DataSource } = require('apollo-datasource');
const { Op } = require('sequelize');

module.exports = class extends DataSource {
  
  constructor(model) {
    super();
    this.model = model;
  }

  initialize(config) {
    this.sequelize = config.context.sequelize;
  }

}