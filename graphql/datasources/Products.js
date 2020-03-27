
const SequelizeDatasource = require('../../util/SequelizeDatasource'); 
const { Op } = require("sequelize");

const INCLUDE_ASSOCIATIONS_CONFIG = {      
  all: true,
  nested: true,
  required: false
};

class ProductsDatasource extends SequelizeDatasource {

  async findAll(offset, limit, order) {
    const products = await this.model.findAll({
      include: INCLUDE_ASSOCIATIONS_CONFIG,
      offset,
      limit,
      order
    });
    
    return products.map(this.reduce);
  }

  async query(query, offset, limit, order = []) {
    const subqueries = [];
    if (Array.isArray(query.productCategories) && query.productCategories.length) {
      subqueries.push({
        [Op.in]: this.sequelize.literal(`(
          select product_id
          from products_product_categories
          where product_category_id in (${query.productCategories.join(',')})
        )`)
      });
    }
    if (Array.isArray(query.makers) && query.makers.length) {
      subqueries.push({
        [Op.in]: this.sequelize.literal(`(
          select product_id
          from products_makers
          where maker_id in (${query.makers.join(',')})
        )`)
      });
    }
    if (Array.isArray(query.tags) && query.tags.length) {
      subqueries.push({
        [Op.in]: this.sequelize.literal(`(
          select product_id
          from products_tags
          where tag_id in (${query.tags.join(',')})
        )`)
      });
    }
    if (Array.isArray(query.youtubeVideos) && query.youtubeVideos.length) {
      subqueries.push({
        [Op.in]: this.sequelize.literal(`(
          select product_id
          from products_youtube_videos
          where youtube_video_id in (${query.youtubeVideos.join(',')})
        )`)
      });
    }
    const products = await this.model.findAll({
      include: INCLUDE_ASSOCIATIONS_CONFIG,
      offset,
      limit,
      where: {
        id: {
          [Op.and]: subqueries
        }
      },
      order: order.map(o => [ o.columnName, o.direction ])
    });
    //console.log(products.length);
    return products.map(this.reduce);
  }

  async findById(id) {
    const product = await this.model.findByPk(id, {
      include: INCLUDE_ASSOCIATIONS_CONFIG
    });

    if (!product) {
      throw new Error('Product not found');
    }
    
    return this.reduce(product);
  }

  async add(data) {
    const transaction = await this.sequelize.transaction();
    const ADD_TRANSACTION_CONFIG = {
      transaction,
      lock: transaction.LOCK.UPDATE
    };

    try {
      const createdProduct = await this.model.create(data, {
        include: INCLUDE_ASSOCIATIONS_CONFIG,
        ...ADD_TRANSACTION_CONFIG
      });
  
      await createdProduct.addTags(data.tags, ADD_TRANSACTION_CONFIG);
      await createdProduct.addProductCategories(data.productCategories, ADD_TRANSACTION_CONFIG);
      await createdProduct.addMakers(data.makers, ADD_TRANSACTION_CONFIG);
      await createdProduct.addYoutubeVideos(data.youtubeVideos, ADD_TRANSACTION_CONFIG);
      await createdProduct.reload(ADD_TRANSACTION_CONFIG);

      await transaction.commit();

      return this.reduce(createdProduct);
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  async update(data) {
    const transaction = await this.sequelize.transaction();
    const UPDATE_TRANSACTION_CONFIG = {
      transaction,
      lock: transaction.LOCK.UPDATE
    };
    
    try {
      const product = await this.model.findByPk(data.id, {
        include: INCLUDE_ASSOCIATIONS_CONFIG,
        ...UPDATE_TRANSACTION_CONFIG
      });
      
      if (!product) {
        throw new Error('Product not found');
      }

      const updatedProduct = await product.update(data, {
        where: {
          id: data.id
        },
        transaction
      });

      await updatedProduct.setTags(data.tags, UPDATE_TRANSACTION_CONFIG);
      await updatedProduct.setProductCategories(data.productCategories, UPDATE_TRANSACTION_CONFIG);
      await updatedProduct.setMakers(data.makers, UPDATE_TRANSACTION_CONFIG);
      await updatedProduct.setYoutubeVideos(data.youtubeVideos, UPDATE_TRANSACTION_CONFIG);
      await updatedProduct.reload(UPDATE_TRANSACTION_CONFIG);
      await transaction.commit();

      return this.reduce(updatedProduct);
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
    
  }

  async remove(data) {
    const transaction = await this.sequelize.transaction();
    const UPDATE_TRANSACTION_CONFIG = {
      transaction,
      lock: transaction.LOCK.UPDATE
    };

    try {
      const product = await this.model.findByPk(data.id, UPDATE_TRANSACTION_CONFIG);
      if (!product) {
        throw new Error('Product not found');
      }
  
      const res = await this.model.destroy({
        where: {
          id: data.id
        },
        ...UPDATE_TRANSACTION_CONFIG
      });

      transaction.commit();

      if (!!res) {
        return product;
      }

    } catch (e) {
      transaction.rollback();
      throw e;
    }
  }

  reduce(product) {
    //console.log(product.ProductCategories.map(c => c.products_product_categories.ProductCategoryId))
    return {
      id: product.get('id'),
      name: product.get('name'),
      productCategories: product.get('ProductCategories'),
      makers: product.get('Makers'),
      tags: product.get('Tags').map(tag => ({
        id: tag.id,
        name: tag.name,
        tagCategory: tag.TagCategory
      })),
      youtubeVideos: product.get('YoutubeVideos')
    };
  }

}

module.exports = ProductsDatasource;
