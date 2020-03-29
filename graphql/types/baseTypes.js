
const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Product {
    id: ID!
    name: String
    productCategories: [ ProductCategory ]
    makers: [ Maker ]
    tags: [ Tag ]
    youtubeVideos: [ YoutubeVideo ]
    price: String
  }

  type TagCategory {
    id: ID!
    name: String
  }

  type YoutubeVideo {
    id: ID!
    description: String!
    youtube_id: String!
  }

  type Tag {
    id: ID!
    name: String
    tagCategory: TagCategory
  }

  type ProductCategory {
    id: ID!
    name: String
  }

  type Maker {
    id: ID!
    name: String
  }

  input QueryProductsQueryInput {
    id: ID
    makers: [ ID ]
    tags: [ ID ]
    productCategories: [ ID ]
    youtubeVideos: [ ID ]
  }

  input QueryProductsOrderInput {
    column: String!
    direction: String!
  }

`;

module.exports = typeDefs;

