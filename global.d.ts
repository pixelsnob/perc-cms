
import { Model, Sequelize } from "sequelize";

declare global {
type NonAbstract<T> = { [P in keyof T]: T[P] }; // "abstract" gets lost here
type Constructor<T> = (new () => T);
type NonAbstractTypeOfModel<T> = Constructor<T> & NonAbstract<typeof Model>;
}
