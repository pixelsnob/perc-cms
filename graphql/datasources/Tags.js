
const SequelizeDatasource = require('../../util/SequelizeDatasource'); 

class TagsDatasource extends SequelizeDatasource {
  
  async findTags() {
    const tags = await this.model.findAll();
    return tags.map(this.reduce);
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

