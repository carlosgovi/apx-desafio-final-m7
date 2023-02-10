import { User } from "./users";
import { Animal } from "./animal";
import { Auth } from "./auth";

///////aqui asocio o RELACIONO los datosde USER y PRODUCT
User.hasMany(Animal);
Animal.belongsTo(User);

export { User, Animal, Auth };
