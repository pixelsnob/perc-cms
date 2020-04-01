
import SequelizeDatasource from '../../util/SequelizeDatasource'; 

class TagsDatasource extends SequelizeDatasource {
  
  async onAddBeforeCommit(data, createdTag, transaction, lock) {
    await createdTag.setTagCategory(data.tagCategory, { transaction, lock });
  }

  async onUpdateBeforeCommit(data, updatedProduct, transaction, lock) {
    await updatedProduct.setTagCategory(data.tagCategory, { transaction, lock });
  }

  reduce(tag) {
    return {
      id: tag.get('id'),
      name: tag.get('name'),
      tagCategory: tag.get('TagCategory')
    };
  }

}

module.exports = TagsDatasource;

