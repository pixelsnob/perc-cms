
const { gql } = require('apollo-server-express');

const typeDefs = gql`

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


    addTagCategory(
      name: String,
      tagCategory: ID!
    ): TagCategory

    updateTagCategory(
      id: ID!
      name: String
      tagCategory: ID!
    ): TagCategory
    
    deleteTagCategory(
      id: ID!
    ): TagCategory


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


    addYoutubeVideo(
      description: String!
      youtube_id: String!
    ): YoutubeVideo

    updateYoutubeVideo(
      id: ID!
      description: String!
      youtube_id: String!
    ): YoutubeVideo
    
    deleteYoutubeVideo(
      id: ID!
    ): YoutubeVideo

  }
`;

module.exports = typeDefs;

