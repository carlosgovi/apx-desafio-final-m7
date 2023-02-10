// import { User, Product,Auth } from "./model";
import { sequelize } from "./conn";

sequelize.sync({ force: true }).then((res) => {
  console.log(res);
});
// sequelize.sync({ alter: true }).then((res) => {
//   console.log(res);
// });
