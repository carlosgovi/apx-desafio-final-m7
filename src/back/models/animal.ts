import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conn";

export class Animal extends Model {}
Animal.init(
  {
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    fullname: DataTypes.STRING,
    img: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  { sequelize, modelName: "animal" }
);
