
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

  input QueryProductsQueryInput {
    id: ID
    makers: [ ID ]
    tags: [ ID ]
    productCategories: [ ID ]
    youtubeVideos: [ ID ]
  }

  input QueryProductsOrderInput {
    columnName: String!
    direction: String!
  }

  type Query {
    findProductCategories: [ ProductCategory ]
    
    findProducts(
      offset: Int,
      limit: Int
      order: QueryProductsOrderInput
    ): [ Product ]
    
    findProductById(id: Int): Product 
    
    queryProducts(
      offset: Int,
      limit: Int,
      query: QueryProductsQueryInput
      order: [ QueryProductsOrderInput ]
    ): [ Product ]
    
    findTags: [ Tag ]
    
    findMakers: [ Maker ]
  }


  type Mutation {
    
    addTag(name: String): Tag
    
    addProduct(
      name: String,
      tags: [ ID! ]
      makers: [ ID! ]
      productCategories: [ ID! ]
      youtubeVideos: [ ID! ]
    ): Product

    updateProduct(
      id: ID!
      name: String,
      tags: [ ID! ]
      makers: [ ID! ]
      productCategories: [ ID! ]
      youtubeVideos: [ ID! ]
    ): Product
    
    findProductById(
      id: ID!
    ): Product

    deleteProduct(
      id: ID!
    ): Product
  }


`;

module.exports = typeDefs;

