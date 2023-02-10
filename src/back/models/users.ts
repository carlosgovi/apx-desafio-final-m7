///antes de cambiar a el nuevo proyecto
import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conn";

export class User extends Model {}
User.init(
  {
    email: DataTypes.STRING,

    fullname: DataTypes.STRING,
  },
  { sequelize, modelName: "user" }
);
