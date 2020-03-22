
const SequelizeDatasource = require('../../util/SequelizeDatasource'); 

class TagsDatasource extends SequelizeDatasource {
  
  async getTags() {
    const tags = await this.model.findAll({ include: { all: true }, required: true });
    return tags.map(this.tagReducer);
  }

  tagReducer(tag) {
    return {
      id: tag.get('id'),
      name: tag.get('name'),
      tagCategory: tag.get('TagCategory')
    };
  }

}

module.exports = TagsDatasource;

