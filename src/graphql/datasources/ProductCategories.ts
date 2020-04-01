

import SequelizeDatasource from '../../util/SequelizeDatasource';
import { ProductCategory } from '../../models/ProductCategory';

class ProductCategoriesDatasource extends SequelizeDatasource {

  reduce(productCategory: ProductCategory) {
    return {
      id: productCategory.get('id'),
      name: productCategory.get('name')
    };
  }
}

module.exports = ProductCategoriesDatasource;
