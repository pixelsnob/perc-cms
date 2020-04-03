
import SequelizeDatasource from '../../util/SequelizeDatasource'; 
import { LOCK, Transaction } from 'sequelize/types';
import { Tag } from '../../models/Tag';

class TagsDatasource extends SequelizeDatasource {
  
  async onAddBeforeCommit(data: Tag, createdTag: Tag, transaction: Transaction, lock: LOCK) {
    await createdTag.setTagCategory(data.tagCategory, { transaction });
  }

  async onUpdateBeforeCommit(data: Tag, updatedTag: Tag, transaction: Transaction, lock: LOCK) {
    await updatedTag.setTagCategory(data.tagCategory, { transaction });
  }

  reduce(tag: Tag) {
    return {
      id: tag.get('id'),
      name: tag.get('name'),
      tagCategory: tag.get('TagCategory')
    };
  }

}

module.exports = TagsDatasource;

