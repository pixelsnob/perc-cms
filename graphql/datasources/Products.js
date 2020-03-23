
const SequelizeDatasource = require('../../util/SequelizeDatasource'); 

class ProductsDatasource extends SequelizeDatasource {
  
  async getProducts() {
    const products = await this.model.findAll({
      include: { all: true, nested: true, required: false }
    });
    return products.map(this.productReducer);
  }

  async getProduct(id) {
    const product = await this.model.findByPk(id, {
      include: { all: true, nested: true }
    });
    if (!product) {
      return null;
    }
    return this.productReducer(product);
  }

  async addProduct(data) {
    const createdProduct = await this.model.create(data);
    await createdProduct.addTags(data.tags);
    const savedProduct = await this.model.findByPk(createdProduct.id, {
      include: { all: true, nested: true, required: false  }
    });
    return this.productReducer(savedProduct);
  }

  productReducer(product) {
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

