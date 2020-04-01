
const { gql } = require('apollo-server-express');

const typeDefs = gql`

  input UpdateProductData {
    name: String
    tags: [ ID! ]
    makers: [ ID! ]
    productCategories: [ ID! ]
    youtubeVideos: [ ID! ]
  }

  input UpdateProductCategoryData {
    name: String
  }
  
  input UpdateMakerData {
    name: String
  }

  input UpdateTagData {
    name: String
    tagCategory: ID!
  }

  input UpdateTagCategoryData {
    name: String
  }

  input UpdateYoutubeVideoData {
    description: String!
    youtube_id: String!
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
      data: UpdateProductData
    ): Product
    
    deleteProduct(
      id: ID!
    ): Product

    
    addProductCategory(
      name: String
    ): ProductCategory

    updateProductCategory(
      id: ID!
      data: UpdateProductCategoryData
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
      data: UpdateTagData!
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
      data: UpdateTagCategoryData!
      # name: String
      # tagCategory: ID!
    ): TagCategory
    
    deleteTagCategory(
      id: ID!
    ): TagCategory


    addMaker(
      name: String
    ): Maker

    updateMaker(
      id: ID!
      data: UpdateMakerData!
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
      data: UpdateYoutubeVideoData!
    ): YoutubeVideo
    
    deleteYoutubeVideo(
      id: ID!
    ): YoutubeVideo

  }
`;

module.exports = typeDefs;

