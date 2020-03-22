
const Sequelize = require('sequelize');
const ProductCategoryModel = require('./ProductCategory');
const TagModel = require('./Tag');
const MakerModel = require('./Maker');
const YoutubeVideoModel = require('./YoutubeVideo');

module.exports = function(sequelize) {

  const Product = sequelize.define('Product', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false
    },
    alt_names: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    range: {
      type: Sequelize.STRING,
      allowNull: false
    },
    model_no: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    underscored: true
  });

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
  
  return Product;
};
