
const SequelizeDatasource = require('../../util/SequelizeDatasource'); 

class ProductCategories extends SequelizeDatasource {
  
  async find() {
    const productCategories = await this.model.findAll({ include });
    return productCategories.map(this.reduce);
  }

  reduce(productCategory) {
    return {
      id: productCategory.get('id'),
      name: productCategory.get('name')
    };
  }
}

module.exports = ProductCategories;

