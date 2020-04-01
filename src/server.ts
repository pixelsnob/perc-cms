import { Sequelize } from "sequelize/types";

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const responseCachePlugin = require('apollo-server-plugin-response-cache');

const gqlBaseTypes = require('./graphql/types/baseTypes');
const gqlMutations = require('./graphql/types/mutations');
const gqlQueries = require('./graphql/types/queries');

const ProductsResolver = require('./graphql/resolvers/Products');
const ProductCategoriesResolver = require('./graphql/resolvers/ProductCategories');
const MakersResolver = require('./graphql/resolvers/Makers');
const TagsResolver = require('./graphql/resolvers/Tags');
const TagCategoriesResolver = require('./graphql/resolvers/TagCategories');
const YoutubeVideosResolver = require('./graphql/resolvers/YoutubeVideos');

const connectToMysql = require('./util/connectToMysql');

const ProductsDatasource = require('./graphql/datasources/Products');
const ProductCategoriesDatasource = require('./graphql/datasources/ProductCategories');
const TagsDatasource = require('./graphql/datasources/Tags');
const TagCategoriesDatasource = require('./graphql/datasources/TagCategories');
const MakersDatasource = require('./graphql/datasources/Makers');
const YoutubeVideosDatasource = require('./graphql/datasources/YoutubeVideos');

import Tag from './models/Tag';
import TagCategory from './models/TagCategory';
import Product from './models/Product';
import ProductCategory from './models/ProductCategory';
import Maker from './models/Maker';
import YoutubeVideo from './models/YoutubeVideo';

const config = require('./config');

connectToMysql(config.mysqlConnectionString).then((sequelize: Sequelize) => {////////

  //const productRepository = sequelize.getRepository(Product);

  const ProductModel = Product(sequelize);
  ProductModel.associate();
  //ProductModel.find({});

  const ProductCategoryModel = ProductCategory(sequelize);
  const TagModel = Tag(sequelize);
  TagModel.associate();
  
  const MakerModel = Maker(sequelize);
  const YoutubeVideoModel = YoutubeVideo(sequelize);
  const TagCategoryModel = TagCategory(sequelize);

  const server = new ApolloServer({
    typeDefs: [
      gqlBaseTypes,
      gqlMutations,
      gqlQueries
    ],
    resolvers: [
      ProductsResolver,
      MakersResolver,
      ProductCategoriesResolver,
      TagCategoriesResolver,
      TagsResolver,
      YoutubeVideosResolver
    ],
    dataSources: () => ({
      Products: new ProductsDatasource(ProductModel),
      ProductCategories: new ProductCategoriesDatasource(ProductCategoryModel),
      Tags: new TagsDatasource(TagModel),
      Makers: new MakersDatasource(MakerModel),
      YoutubeVideos: new YoutubeVideosDatasource(YoutubeVideoModel),
      TagCategories: new TagCategoriesDatasource(TagCategoryModel)

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

}).catch((e: typeof Error) => console.error(e));

