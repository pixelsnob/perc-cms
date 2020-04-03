
import { Model, HasManyAddAssociationsMixin, HasManySetAssociationsMixin, BuildOptions } from "sequelize";
import { Tag } from "./models/Tag";
import { ProductCategory } from "./models/ProductCategory";
import { Maker } from "./models/Maker";
import { YoutubeVideo } from "./models/YoutubeVideo";
import { TagCategory } from "./models/TagCategory";

  //type NonAbstract<T> = { [P in keyof T]: T[P] }; // "abstract" gets lost here
  //type Constructor<T> = (new () => T);
  // So that model instance methods don't get lost
  //type NonAbstractTypeOfModel<T> = Constructor<T> & NonAbstract<typeof Model>

declare global {

  interface IFindAllInput {
    offset: Number
    limit: number
    order: [
      { column: string, direction: string }
    ]
  }

  interface IQueryInput {
    query: any
    offset: Number
    limit: number
    order: [
      { column: string, direction: string }
    ]
  }

//   interface Product extends Model {
//     readonly id: number;
//     associate: () => void;
// }
  
//   // Need to declare the static model so `findOne` etc. use correct types.
//   type ProductStatic = typeof Model & {
//     new (values?: object, options?: BuildOptions): Product;
//     associate: () => void;
//     addTags: HasManyAddAssociationsMixin<Tag, number>;
//     addProductCategories: HasManyAddAssociationsMixin<ProductCategory, number>;
//     addMakers: HasManyAddAssociationsMixin<Maker, number>;
//     addYoutubeVideos: HasManyAddAssociationsMixin<YoutubeVideo, number>;

//     setTags: HasManySetAssociationsMixin<Tag, number>;
//     setProductCategories: HasManySetAssociationsMixin<ProductCategory, number>;
//     setMakers: HasManySetAssociationsMixin<Maker, number>;
//     setYoutubeVideos: HasManySetAssociationsMixin<YoutubeVideo, number>;
//   }


//   interface Tag extends Model {
//     readonly id: number;
//     associate: () => void;
//   }

//   // Need to declare the static model so `findOne` etc. use correct types.
//   type TagStatic = typeof Model & {
//     new (values?: object, options?: BuildOptions): Tag;
//     associate: () => void;
//     addTagCategory: HasManyAddAssociationsMixin<Tag, number>;
  
//   }

  // interface ProductConstructor {
  //   new(): ProductInstance;
  
  //   associate: () => void;

  //   addTags: HasManyAddAssociationsMixin<Tag, number>;
  //   addProductCategories: HasManyAddAssociationsMixin<ProductCategory, number>;
  //   addMakers: HasManyAddAssociationsMixin<Maker, number>;
  //   addYoutubeVideos: HasManyAddAssociationsMixin<YoutubeVideo, number>;
  
  //   setTags: HasManySetAssociationsMixin<Tag, number>;
  //   setProductCategories: HasManySetAssociationsMixin<ProductCategory, number>;
  //   setMakers: HasManySetAssociationsMixin<Maker, number>;
  //   setYoutubeVideos: HasManySetAssociationsMixin<YoutubeVideo, number>;
  // }

  // interface ProductInstance {
  //   id: Number;
  //   name?: string;
  //   tags: [ TagInstance ]; // need to replace these with TagInstance... etc.
  //   productCategories: [ any ];
  //   youtubeVideos: [ any ];
  //   makers: [ any ];
  // }

  // interface ProductCategoryConstructor {
  //   new(): ProductInstance;
  // }

  // interface ProductCategoryInstance {
  //   id: Number;
  //   name: string;
  // }

  // interface ProductCategoryConstructor {
  //   new(): ProductCategoryInstance;
  // }

  // interface TagInstance {
  //   // id: Number;
  //   // name: string;
  //   // tagCategories: [ any ];  // need to replace these with TagInstance... etc.
  // }

  // interface TagConstructor {
  //   new(): TagInstance;
  
  //   associate: () => void;

  //   addTagCategory: HasManyAddAssociationsMixin<TagCategory, number>;
  //   setTagCategory: HasManySetAssociationsMixin<TagCategory, number>;
  // }

  // interface TagCategoryInstance {
  //   id: Number;
  //   name: string;
  // }

  // interface TagCategoryConstructor {
  //   new(): TagCategoryInstance;
  // }

  // interface MakerInstance {
  //   id: Number;
  //   name: string;
  // }

  // interface MakerConstructor {
  //   new(): MakerInstance;
  // }

  // interface YoutubeVideoInstance {
  //   id: Number;
  //   name: string;
  // }

  // interface YoutubeVideoConstructor {
  //   new(): YoutubeVideoInstance;
  // }
}
