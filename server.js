
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const responseCachePlugin = require('apollo-server-plugin-response-cache');
const typeDefs = require('./graphql/types');
const resolvers = require('./graphql/resolvers');
const connectToMysql = require('./util/connectToMysql');
const ProductsDatasource = require('./graphql/datasources/Products');
const ProductCategoriesDatasource = require('./graphql/datasources/ProductCategories');
const TagsDatasource = require('./graphql/datasources/Tags');
const MakersDatasource = require('./graphql/datasources/Makers');
const YoutubeVideosDatasource = require('./graphql/datasources/YoutubeVideos');

const Tag = require('./models/Tag');
const Product = require('./models/Product');
const ProductCategory = require('./models/ProductCategory');
const Maker = require('./models/Maker');
const YoutubeVideo = require('./models/YoutubeVideo');

const config = require('./config');

connectToMysql(config.mysqlConnectionString).then(sequelize => {

  const ProductModel = Product(sequelize);
  ProductModel.associate();
  
  const ProductCategoryModel = ProductCategory(sequelize);
  const TagModel = Tag(sequelize);
  const MakerModel = Maker(sequelize);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      Products: new ProductsDatasource(ProductModel),
      ProductCategories: new ProductCategoriesDatasource(ProductCategoryModel),
      Tags: new TagsDatasource(TagModel),
      Makers: new MakersDatasource(MakerModel),
      YoutubeVideos: new YoutubeVideosDatasource(YoutubeVideo)
    }),
    context: async () => {
      return { sequelize };
    },
    // formatError: err => {
    //   console.error(err);
    //   return err;
    // },

    // cacheControl: {
    //   defaultMaxAge: 10,
    // },
    // plugins: [ responseCachePlugin() ]
  });
  
  const app = express();
  server.applyMiddleware({ app });
  
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );

}).catch(e => console.error(e));



