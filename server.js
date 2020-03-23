
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const responseCachePlugin = require('apollo-server-plugin-response-cache');
const typeDefs = require('./graphql/types');
const resolvers = require('./graphql/resolvers');
const connectToMysql = require('./util/connectToMysql');
const ProductsDatasource = require('./graphql/datasources/Products');
const ProductCategoriesDatasource = require('./graphql/datasources/Products');
const TagsDatasource = require('./graphql/datasources/Tags');

const Tag = require('./models/Tag');
const Product = require('./models/Product');
const ProductCategory = require('./models/ProductCategory');

const config = require('./config');

connectToMysql(config.mysqlConnectionString).then(sequelize => {

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      Products: new ProductsDatasource(Product(sequelize)),
      ProductCategories: new ProductCategoriesDatasource(ProductCategory(sequelize)),
      Tags: new TagsDatasource(Tag(sequelize))
      //Makers: new MakersDatasource(Maker(sequelize))

    }),
    context: async () => {
      return { sequelize };
    },
    // formatError: err => {
    //   console.error(err);
    //   return err;
    // },
    cacheControl: {
      defaultMaxAge: 10,
    },
    plugins: [ responseCachePlugin() ]
  });
  
  const app = express();
  server.applyMiddleware({ app });
  
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );

}).catch(e => console.error(e));



