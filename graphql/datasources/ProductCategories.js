
const SequelizeDatasource = require('../../util/SequelizeDatasource');

class ProductCategoriesDatasource extends SequelizeDatasource {

  reduce(item) {
    return {
      id: item.get('id'),
      name: item.get('name')
    };
  }
}

module.exports = ProductCategoriesDatasource;


