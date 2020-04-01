
import SequelizeDatasource from '../../util/SequelizeDatasource';

class MakersDatasource extends SequelizeDatasource {

  reduce(item) {
    return {
      id: item.get('id'),
      name: item.get('name')
    };
  }
}

module.exports = MakersDatasource;


