
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
    price: String
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

  type Query {
    findProductCategories: [ ProductCategory ]
    
    findProducts(
      offset: Int
      limit: Int
      order: [ QueryProductsOrderInput ]
    ): [ Product ]
    
    findProductById(id: ID!): Product 
    
    queryProducts(
      offset: Int
      limit: Int
      query: QueryProductsQueryInput!
      order: [ QueryProductsOrderInput ]
    ): [ Product ]

    findProductCategoryById(
      id: ID!
    ): ProductCategory
  
    findTagById(id: ID!): Tag 

    findMakerById(id: ID!): Maker 

    findMakers(
      offset: Int
      limit: Int
      order: [ QueryProductsOrderInput ]
    ): [ Maker ]
  }


  type Mutation {
    
    addProduct(
      name: String
      tags: [ Int! ]
      makers: [ ID! ]
      productCategories: [ ID! ]
      youtubeVideos: [ ID! ]
    ): Product

    updateProduct(
      id: ID!
      name: String
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

    addProductCategory(
      name: String
    ): ProductCategory

    updateProductCategory(
      id: ID!
      name: String
    ): ProductCategory
    
    deleteProductCategory(
      id: ID!
    ): ProductCategory
    
    addTag(
      name: String,
      tagCategory: ID!
    ): Tag

    updateTag(
      id: ID!
      name: String
      tagCategory: ID!
    ): Tag
    
    deleteTag(
      id: ID!
    ): Tag

    addMaker(
      name: String
    ): Maker

    updateMaker(
      id: ID!
      name: String
    ): Maker
    
    deleteMaker(
      id: ID!
    ): Maker
  }


`;

module.exports = typeDefs;

