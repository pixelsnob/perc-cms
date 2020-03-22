
const SequelizeDatasource = require('../../util/SequelizeDatasource'); 

class ProductCategories extends SequelizeDatasource {
  
  async getProductCategories() {
    const productCategories = await this.model.findAll({ include });
    return productCategories.map(this.productCategoryReducer);
  }

  productCategoryReducer(productCategory) {
    return {
      id: productCategory.get('id'),
      name: productCategory.get('name')
    };
  }

}

module.exports = ProductCategories;

