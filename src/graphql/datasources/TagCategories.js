
const SequelizeDatasource = require('../../util/SequelizeDatasource'); 

class TagCategoriesDatasource extends SequelizeDatasource {

  reduce(tag) {
    return {
      id: tag.get('id'),
      name: tag.get('name')
    };
  }

}

module.exports = TagCategoriesDatasource;

