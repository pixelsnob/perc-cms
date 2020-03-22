
const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type TagCategory {
    id: ID!
    name: String
  }

  type YoutubeVideo {
    id: ID!
    description: String
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
  
  type Product {
    id: ID!
    name: String
    productCategories: [ ProductCategory ]
    makers: [ Maker ]
    tags: [ Tag ]
    youtubeVideos: [ YoutubeVideo ]
  }

  type Query {
    productCategories: [ ProductCategory ]
    products: [ Product ]
    product(id: Int): Product 
    tags: [ Tag ]
    makers: [ Maker ]
  }

  type Mutation {
    addTag(name: String): Tag
    addProduct(
      name: String
    ): Product
  }
  
`;

module.exports = typeDefs;

