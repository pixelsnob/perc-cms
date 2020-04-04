
import {
  Model,
  Sequelize,
  DataTypes,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
} from "sequelize";

import ProductCategoryModel, { ProductCategory } from './ProductCategory';
import TagModel, { Tag } from './Tag';
import MakerModel, { Maker } from './Maker';
import YoutubeVideoModel, { YoutubeVideo } from './YoutubeVideo';

export class Product extends Model {

  id!: number;
  name!: string;
  tags!: [ Tag ];
  productCategories!: [ ProductCategory ];
  youtubeVideos!: [ YoutubeVideo ];
  makers!: [ Maker ];
  price!: string;

  static associate: () => void;
  
  addTag!: HasManyAddAssociationsMixin<Tag, number>;

  addMaker!: HasManyAddAssociationsMixin<Maker, number>;

  addYoutubeVideo!: HasManyAddAssociationsMixin<YoutubeVideo, number>;
  addProductCategory!: HasManyAddAssociationsMixin<ProductCategory, number>;

  setTags!: HasManySetAssociationsMixin<Tag, number>;
  setProductCategories!: HasManySetAssociationsMixin<ProductCategory, number>;
  setMakers!: HasManySetAssociationsMixin<Maker, number>;
  setYoutubeVideos!: HasManySetAssociationsMixin<YoutubeVideo, number>;

}

export default function (sequelize: Sequelize) {

  Product.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    alt_names: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    range: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    model_no: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    underscored: true,
    sequelize
  });

  Product.associate = function () {
    const Tag = TagModel(sequelize);

    Product.belongsToMany(Tag, { through: 'products_tags' });
    Tag.belongsToMany(Product, { through: 'products_tags' });

    const ProductCategory = ProductCategoryModel(sequelize);

    Product.belongsToMany(ProductCategory, { through: 'products_product_categories' });
    ProductCategory.belongsToMany(Product, { through: 'products_product_categories' });

    const Maker = MakerModel(sequelize);

    Product.belongsToMany(Maker, { through: 'products_makers' });
    Maker.belongsToMany(Product, { through: 'products_makers' });

    const YoutubeVideo = YoutubeVideoModel(sequelize);

    Product.belongsToMany(YoutubeVideo, { through: 'products_youtube_videos' });
    YoutubeVideo.belongsToMany(Product, { through: 'products_youtube_videos' });
  }

  return Product;
};
