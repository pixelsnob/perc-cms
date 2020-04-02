
import { Model, Sequelize } from "sequelize";

type NonAbstract<T> = { [P in keyof T]: T[P] }; // "abstract" gets lost here
type Constructor<T> = (new () => T);

declare global {
  
  // So that model instance methods don't get lost
  type NonAbstractTypeOfModel<T> = Constructor<T> & NonAbstract<typeof Model>

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
  
}
