
const SequelizeDatasource = require('../../util/SequelizeDatasource');

class ProductCategoriesDatasource extends SequelizeDatasource {

  reduce(productCategory) {
    return {
      id: productCategory.get('id'),
      name: productCategory.get('name')
    };
  }
}

module.exports = ProductCategoriesDatasource;
