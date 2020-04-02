
import SequelizeDatasource from '../../util/SequelizeDatasource';
import { Maker } from '../../models/Maker';

class MakersDatasource extends SequelizeDatasource {

  reduce(item: Maker) {
    return {
      id: item.get('id'),
      name: item.get('name')
    };
  }
}

module.exports = MakersDatasource;


