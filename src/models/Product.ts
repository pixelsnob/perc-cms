
import {
  Model,
  Sequelize,
  DataTypes,
  //HasManyGetAssociationsMixin,
  HasManyAddAssociationsMixin,
  //HasManyHasAssociationMixin,
  //HasManyCreateAssociationMixin,
  HasManySetAssociationsMixin
} from "sequelize";

import ProductCategoryModel, { ProductCategory } from './ProductCategory';
import TagModel, { Tag } from './Tag';
import MakerModel, { Maker } from './Maker';
import YoutubeVideoModel, { YoutubeVideo } from './YoutubeVideo';

export class Product extends Model {

  public id!: number;
  public tags: [ typeof TagModel ];
  public productCategories: [ typeof ProductCategoryModel ];
  public youtubeVideos: [typeof YoutubeVideoModel];
  public makers: [typeof MakerModel];

  static associate: () => void;

  static addTags: HasManyAddAssociationsMixin<typeof TagModel, number>;
  static addProductCategories: HasManyAddAssociationsMixin<typeof ProductCategoryModel, number>;
  static addMakers: HasManyAddAssociationsMixin<typeof MakerModel, number>;
  static addYoutubeVideos: HasManyAddAssociationsMixin<typeof YoutubeVideoModel, number>;

  static setTags: HasManySetAssociationsMixin<typeof TagModel, number>;
  static setProductCategories: HasManySetAssociationsMixin<typeof ProductCategoryModel, number>;
  static setMakers: HasManySetAssociationsMixin<typeof MakerModel, number>;
  static setYoutubeVideos: HasManySetAssociationsMixin<typeof YoutubeVideoModel, number>;

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
