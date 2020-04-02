import { Model, Sequelize } from "sequelize";
import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { Transaction, LOCK } from 'sequelize/types';
import { Product } from "../models/Product";

// type NonAbstract<T> = { [P in keyof T]: T[P] }; // "abstract" gets lost here
// type Constructor<T> = (new () => T);
// type NonAbstractTypeOfModel<T> = Constructor<T> & NonAbstract<typeof Model>;

const ASSOCIATIONS_INCLUDE_ALL_NESTED = {
  all: true,
  nested: true,
  required: false
};

class SequelizeDatasource extends DataSource<NonAbstractTypeOfModel<Model>> {

  protected model: NonAbstractTypeOfModel<Model>;
  protected sequelize: Sequelize;

  public async onAddBeforeCommit(data: any, item: Model, transaction: Transaction, lock: LOCK) {}
  public async onUpdateBeforeCommit(data: any, item: Model, transaction: Transaction, lock: LOCK) {}

  constructor(model: NonAbstractTypeOfModel<Model>) {
    super();
    this.model = model;
  }

  initialize(config: DataSourceConfig<NonAbstractTypeOfModel<Model>>) {
    this.sequelize = config.context.sequelize;
  }

  async findAll(offset: number, limit: number, order: [{ column: string, direction: string }?] = []) {
    const items = await this.model.findAll({
      include: [ ASSOCIATIONS_INCLUDE_ALL_NESTED ],
      offset,
      limit,
      order: order.map(o => [o.column, o.direction])
    });

    return items.map(this.reduce);
  }

  reduce(item: Model) {
    throw new Error("Method not implemented.");
  }

  async findById(id: number) {
    const item = await this.model.findByPk(id, {
      include: [ ASSOCIATIONS_INCLUDE_ALL_NESTED ]
    });

    if (!item) {
      throw new Error(`${this.model.name} not found!`);
    }

    return this.reduce(item);
  }

  async add(data: Model) {
    const transaction = await this.sequelize.transaction();
    let createdItem = null;

    try {
      createdItem = await this.model.create(data, {
        include: [ ASSOCIATIONS_INCLUDE_ALL_NESTED ],
        transaction
        //lock: transaction.LOCK.UPDATE
      });

      if (typeof this.onAddBeforeCommit == "function") {
        await this.onAddBeforeCommit(
          data,
          createdItem,
          transaction,
          transaction.LOCK.UPDATE
        );
        await createdItem.reload({
          transaction,
          lock: transaction.LOCK.UPDATE
        });
      }

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }

    return this.reduce(createdItem);
  }

  async update(id: number, data: Model) {
    const transaction = await this.sequelize.transaction();
    let updatedItem = null;
    try {
      const item = await this.model.findByPk(id, {
        include: [ ASSOCIATIONS_INCLUDE_ALL_NESTED ],
        transaction,
        lock: transaction.LOCK.UPDATE
      });

      if (!item) {
        throw new Error(`${this.model.name} not found!`);
      }

      updatedItem = await item.update(data, {
        where: {
          id
        },
        transaction
        //lock: transaction.LOCK.UPDATE
      });

      if (typeof this.onUpdateBeforeCommit == "function") {
        await this.onUpdateBeforeCommit(
          data,
          updatedItem,
          transaction,
          transaction.LOCK.UPDATE
        );
        await updatedItem.reload({
          transaction,
          lock: transaction.LOCK.UPDATE
        });
      }

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }

    return this.reduce(updatedItem);
  }

  async remove(id: number) {
    const transaction = await this.sequelize.transaction();
    let item = null;

    try {
      item = await this.model.findByPk(id, {
        include: [ ASSOCIATIONS_INCLUDE_ALL_NESTED ],
        transaction,
        lock: transaction.LOCK.UPDATE
      });
      if (!item) {
        throw new Error(`${this.model.name} not found!`);
      }

      const res = await this.model.destroy({
        where: {
          id: id
        },
        transaction
        //lock: transaction.LOCK.UPDATE
      });

      // if (typeof this.onRemoveBeforeCommit == 'function') {
      //   await this.onRemoveBeforeCommit(
      //     data,
      //     item,
      //     transaction,
      //     transaction.LOCK.UPDATE
      //   );
      //   await item.reload({ transaction, lock: transaction.LOCK.UPDATE });
      // }

      transaction.commit();

      if (!res) {
        throw new Error(`${this.model.name} was not removed!`);
      }
    } catch (e) {
      transaction.rollback();
      throw e;
    }

    return this.reduce(item);
  }

};

export default SequelizeDatasource;