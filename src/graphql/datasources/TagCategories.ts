
import SequelizeDatasource from '../../util/SequelizeDatasource'; 
import { Tag } from '../../models/Tag';

class TagCategoriesDatasource extends SequelizeDatasource {

  reduce(tag: Tag) {
    return {
      id: tag.get('id'),
      name: tag.get('name')
    };
  }

}

module.exports = TagCategoriesDatasource;

