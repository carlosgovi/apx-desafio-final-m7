import { Sequelize } from "sequelize";
const sequelize_conn = process.env.SEQUELIZE_CONN;
export const sequelize = new Sequelize(sequelize_conn);
