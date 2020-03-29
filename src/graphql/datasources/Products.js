
const SequelizeDatasource = require('../../util/SequelizeDatasource');
const { Op } = require("sequelize");

class ProductsDatasource extends SequelizeDatasource {

  async query(query, offset, limit, order = []) {
    const subqueries = [];
    const listFormat = arr => arr.map(str => `"${str}"`).join(',');
    if (Array.isArray(query.productCategories) && query.productCategories.length) {
      subqueries.push({
        [Op.in]: this.sequelize.literal(`(
          select product_id
          from products_product_categories
          where product_category_id in (${listFormat(query.productCategories)})
        )`)
      });
    }
    if (Array.isArray(query.makers) && query.makers.length) {
      subqueries.push({
        [Op.in]: this.sequelize.literal(`(
          select product_id
          from products_makers
          where maker_id in (${listFormat(query.makers)})
        )`)
      });
    }
    if (Array.isArray(query.tags) && query.tags.length) {
      subqueries.push({
        [Op.in]: this.sequelize.literal(`(
          select product_id
          from products_tags
          where tag_id in (${listFormat(query.tags)})
        )`)
      });
    }
    if (Array.isArray(query.youtubeVideos) && query.youtubeVideos.length) {
      subqueries.push({
        [Op.in]: this.sequelize.literal(`(
          select product_id
          from products_youtube_videos
          where youtube_video_id in (${listFormat(query.youtubeVideos)})
        )`)
      });
    }
    
    const products = await this.model.findAll({
      include: {
        all: true,
        nested: true,
      },
      offset,
      limit,
      where: {
        id: {
          [Op.and]: subqueries
        }
      },
      order: order.map(o => [ o.column, o.direction ])
    });
    return products.map(this.reduce);
  }

  async onAddBeforeCommit(data, createdProduct, transaction, lock) {
    await createdProduct.addTags(data.tags, { transaction, lock });
    await createdProduct.addProductCategories(data.productCategories, { transaction, lock });
    await createdProduct.addMakers(data.makers, { transaction, lock });
    await createdProduct.addYoutubeVideos(data.youtubeVideos, { transaction, lock });
  }

  async onUpdateBeforeCommit(data, updatedProduct, transaction, lock) {
    await updatedProduct.setTags(data.tags, { transaction, lock });
    await updatedProduct.setProductCategories(data.productCategories, { transaction, lock });
    await updatedProduct.setMakers(data.makers, { transaction, lock });
    await updatedProduct.setYoutubeVideos(data.youtubeVideos, { transaction, lock });
  }
  
  reduce(product) {
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
      youtubeVideos: product.get('YoutubeVideos'),
      price: product.get('price')
    };
  }

}

module.exports = ProductsDatasource;
