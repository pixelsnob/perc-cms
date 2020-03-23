
const connectToMysql = require('./connectToMysql');
const connectToMongo = require('./connectToMongo');

const config = require('../config');
const ProductModel = require('../models/Product');
const ProductCategoryModel = require('../models/ProductCategory');
const TagCategoryModel = require('../models/TagCategory');

const TagModel = require('../models/Tag');
const MakerModel = require('../models/Maker');
const YoutubeVideoModel = require('../models/YoutubeVideo');

connectToMysql(config.mysqlConnectionString).then(async sequelize => {

  const mongoClient = await connectToMongo(config.mongoDbConnectionString);
  const mongoDb = mongoClient.db(config.mongoDbName);

  const products = await mongoDb.collection('products').find().toArray();
  const tags = await mongoDb.collection('tags').find().toArray();
  const tagCategories = await mongoDb.collection('tag_categories').find().toArray();
  const productCategories = await mongoDb.collection('product_categories').find().toArray();
  const makers = await mongoDb.collection('makers').find().toArray();
  const youtubeVideos = await mongoDb.collection('youtube_videos').find().toArray();

  const ProductCategory = ProductCategoryModel(sequelize);
  const Product = ProductModel(sequelize);
  const TagCategory = TagCategoryModel(sequelize);
  const Tag = TagModel(sequelize);
  const Maker = MakerModel(sequelize);
  const YoutubeVideo = YoutubeVideoModel(sequelize);

  await sequelize.sync({ force: true });

  for (const productCategory of productCategories) {
    await ProductCategory.create({ id: productCategory._id, ...productCategory });
  }
  
  for (const tagCategory of tagCategories) {
    await TagCategory.create({ id: tagCategory._id, ...tagCategory });
  }

  for (const tag of tags) {
    await Tag.create({ id: tag._id, tag_category_id: tag.category, name: tag.name });
  }

  for (const maker of makers) {
    await Maker.create({ id: maker._id, ...maker });
  }

  for (const youtube_video of youtubeVideos) {
    await YoutubeVideo.create({ id: youtube_video._id, ...youtube_video });
  }

  for (const product of products) {
    const createdProduct = await Product.create({ id: product.id, ...product });
    
    // Relationships
    for (const product_category_id of product.categories) {
      if (await ProductCategory.findByPk(product_category_id)) {
        await createdProduct.addProductCategory(product_category_id);
      }
    }
    for (const tag_id of product.tags) {
      if (await Tag.findByPk(tag_id)) {
        await createdProduct.addTag(tag_id);
      }
    }
    for (const maker_id of product.makers) {
      if (await Maker.findByPk(maker_id)) {
        await createdProduct.addMaker(maker_id);
      }
    }
    for (const youtube_video_id of product.youtube_videos) {
      if (await YoutubeVideo.findByPk(youtube_video_id)) {
        await createdProduct.addYoutubeVideo(youtube_video_id);
      }
    }
  }
  
  mongoClient.close();
  
  console.log('Migration done!');

}).catch(console.error);

