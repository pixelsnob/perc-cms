
const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Query {
      
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

    findProductCategories(
      offset: Int
      limit: Int
      order: [ QueryProductsOrderInput ]
    ): [ ProductCategory ]

    findProductCategoryById(
      id: ID!
    ): ProductCategory

    findTags(
      offset: Int
      limit: Int
      order: [ QueryProductsOrderInput ]
    ): [ Tag ]

    findTagById(id: ID!): Tag 

    findTagCategories(
      offset: Int
      limit: Int
      order: [ QueryProductsOrderInput ]
    ): [ TagCategory ]

    findTagCategoryById(id: ID!): TagCategory 

    findMakers(
      offset: Int
      limit: Int
      order: [ QueryProductsOrderInput ]
    ): [ Maker ]

    findMakerById(id: ID!): Maker 


    findYoutubeVideos(
      offset: Int
      limit: Int
      order: [ QueryProductsOrderInput ]
    ): [ YoutubeVideo ]

    findYoutubeVideoById(id: ID!): YoutubeVideo 
  }

`;

module.exports = typeDefs;

