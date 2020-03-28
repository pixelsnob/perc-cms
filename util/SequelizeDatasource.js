
const { DataSource } = require('apollo-datasource');

const ASSOCIATIONS_INCLUDE_ALL_NESTED = {      
  all: true,
  nested: true,
  required: false
};

module.exports = class extends DataSource {
  
  constructor(model) {
    super();
    this.model = model;
  }

  initialize(config) {
    this.sequelize = config.context.sequelize;
  }

  async findAll(offset, limit, order) {
    const items = await this.model.findAll({
      include: ASSOCIATIONS_INCLUDE_ALL_NESTED,
      offset,
      limit,
      order
    });
    
    return items.map(this.reduce);
  }

  async findById(id) {
    const item = await this.model.findByPk(id, {
      include: ASSOCIATIONS_INCLUDE_ALL_NESTED
    });

    if (!item) {
      throw new Error(`${this.model.name} not found!`);
    }
    
    return this.reduce(item);
  }

  async add(data) { ////create
    const transaction = await this.sequelize.transaction();
    let createdItem = null;

    try {
      createdItem = await this.model.create(data, {
        include: ASSOCIATIONS_INCLUDE_ALL_NESTED,
        transaction,
        lock: transaction.LOCK.UPDATE
      });
  
      if (typeof this.onAddBeforeCommit == 'function') {
        await this.onAddBeforeCommit(data, createdItem, transaction, transaction.LOCK.UPDATE);
        await createdItem.reload({ transaction, lock: transaction.LOCK.UPDATE });
      }
      
      await transaction.commit();
      
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
    
    return this.reduce(createdItem);
  }

  async update(data) {
    const transaction = await this.sequelize.transaction();
    let updatedItem = null;
    try {
      const item = await this.model.findByPk(data.id, {
        include: ASSOCIATIONS_INCLUDE_ALL_NESTED,
        transaction,
        lock: transaction.LOCK.UPDATE
      });
      
      if (!item) {
        throw new Error(`${this.model.name} not found!`);
      }

      updatedItem = await item.update(data, {
        where: {
          id: data.id
        },
        transaction,
        lock: transaction.LOCK.UPDATE
      });

      if (typeof this.onUpdateBeforeCommit == 'function') {
        await this.onUpdateBeforeCommit(data, updatedItem, transaction, transaction.LOCK.UPDATE);
        await updatedItem.reload({ transaction, lock: transaction.LOCK.UPDATE });
      }
      
      await transaction.commit();
      
    } catch (e) {
      await transaction.rollback();
      throw e;
    }

    return this.reduce(updatedItem);
  }

  async remove(data) {
    const transaction = await this.sequelize.transaction();
    let item = null;

    try {
      item = await this.model.findByPk(data.id, {
        include: ASSOCIATIONS_INCLUDE_ALL_NESTED,
        transaction,
        lock: transaction.LOCK.UPDATE
      });
      if (!item) {
        throw new Error(`${this.model.name} not found!`);
      }
  
      const res = await this.model.destroy({
        where: {
          id: data.id
        },
        transaction,
        lock: transaction.LOCK.UPDATE
      });

      if (typeof this.onRemoveBeforeCommit == 'function') {
        await this.onRemoveBeforeCommit(data, updatedItem, transaction, transaction.LOCK.UPDATE);
        await item.reload({ transaction, lock: transaction.LOCK.UPDATE });
      }

      transaction.commit();

      if (!res) {
        throw new Error(`Error removing ${this.model.name}`);
      }

    } catch (e) {
      transaction.rollback();
      throw e;
    }

    return this.reduce(item);
  }

  // reduce(item) {
  //   return item;
  // }
}