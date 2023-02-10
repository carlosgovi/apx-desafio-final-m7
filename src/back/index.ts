import * as express from "express";
import * as cors from "cors";
import { sequelize } from "./models/conn";
import { index } from "./lib/algolia";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { User, Animal, Auth } from "./models/model";
import {
  tratarImg,
  editImg,
  eliminarAnimal,
} from "./controller/file-controller";

////////////////////////////////////SYNC DB/////////////////////////////////////////////

//import "./models/sinc";
///////////////////////////////////////////////////////////////////////////////////
import path = require("path");
const port = process.env.PORT || 3000;
const enviroment = process.env.ENVIROMENT;
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.listen(port, () => {
  console.log("=====SERVER CORRIENDO=====", "ENVIROMENT=", enviroment);
});
//secret JWT
const SECRET = "asdasdasd123412341234";
/////HASH para poder guardar datos de la pass
function getSHA256ofstring(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}
////////////////SINGUP ---creo el user en la db
app.post("/auth", async (req, res) => {
  const { email, fullname, password } = req.body;
  // const user = req.body;
  // res.json({ prueba: user });
  const [user, created] = await User.findOrCreate({
    where: { email: req.body.email },
    ///si no existe se crea
    defaults: {
      email,
      fullname,
    },
  });
  console.log("User creado==", { created });
  const [auth, authCreated] = await Auth.findOrCreate({
    where: { user_id: user.get("id") },
    ///si no existe se crea
    defaults: {
      email,
      password: getSHA256ofstring(password),
      user_id: user.get("id"),
    },
  });
  console.log({ authCreated, auth });

  res.json({ user });
});
/////Check EMAIL para Singin
app.post("/auth/email", async (req, res) => {
  const { email } = req.body;

  const auth = await User.findOne({
    where: {
      email,
    },
  });

  if (auth) {
    res.json({ messaje: true });
  } else {
    res.status(400).json({ error: "email no existe" });
  }
});
////SINGIN
////////SOLUCIAONAR LOS PROBLEMAS DE CUANDO EL PASS ES INCORRECTO
app.post("/auth/token", async (req, res) => {
  const { email, password } = req.body;
  ///paso el pass por el hasheador para comparar con el dato de la db
  const passwordHasheado = getSHA256ofstring(password);
  const auth = await Auth.findOne({
    where: {
      email,
      password: passwordHasheado,
    },
  });
  const idUserEnauth: any = auth.get("user_id");
  const user = await User.findByPk(idUserEnauth);
  const fullname = user.get("fullname");
  //en el token guardo el token generado para ese user
  const token = jwt.sign({ id: auth.get("user_id") }, SECRET);

  if (auth) {
    res.json({ token, fullname });
  } else {
    res.status(400).json({ error: "email o password incorrecto" });
  }
});
////CREANDO  middleware para la auth (si la verificacion de los datos es correcta sigue el codigo " next() ") ///////////+++++++++++++++++

function authMiddleware(req, res, next) {
  // console.log("req_body", req.body);
  // console.log("headers", req.headers);

  //uso el split para separar el dato de el token
  const token = req.headers.authorization.split(" ")[1];
  //manejo el verificacion con un try catch
  try {
    const data = jwt.verify(token, SECRET);
    req._user = data;
    next();
  } catch (error) {
    res.status(401).json({ error: true });
  }
}
///////////me Retorna los datos de ese user ....siempre y cuando pase el middelware que verifica el token
app.get("/me", authMiddleware, async (req: any, res) => {
  ///este _user.id es el id que me pasa el authMiddleware
  const user = await User.findByPk(req._user.id);
  res.json({ user });
});

////animal crea un animal con RELACION al user ue lo registro a ese producto
app.post("/animal", authMiddleware, async (req: any, res) => {
  console.log(":::::::::::::corriendo:::::/ANIMAL:::::::::::");
  console.log("el user id que me pasa el midelware", req._user.id);
  /////////////////////////
  const updateData = req.body;
  // Ejecutar la función tratarImg y almacenar el resultado en la variable 'url'
  const saveIMG = await tratarImg(req._user.id, updateData);
  /////////////////////////////
  // ///este _user.id es el id que me pasa el authMiddleware
  // const animal = await Animal.create({
  //   ///todos los campos que tenga en el body los voy a usar para los products ((igual el modelo de products tiene solo dos title y price))
  //   ...req.body,
  //   userId: req._user.id,
  // });

  res.json({ saveIMG });
});
///////////editar animales registrados
app.put("/editar/animal", authMiddleware, async (req: any, res) => {
  console.log(":::::::::::::corriendo::::://editar/animal:::::::::::");
  console.log("el user id que me pasa el midelware", req._user.id);
  /////////////////////////
  const updateData = req.body;
  // Ejecutar la función tratarImg y almacenar el resultado en la variable 'url'
  const saveIMG = await editImg(req._user.id, updateData);

  res.json({ saveIMG });
});
//////eliminar animales registrados solo cambiando el userId a ((0))
app.put("/eliminar/animal", authMiddleware, async (req: any, res) => {
  console.log(":::::::::::::corriendo::::://eliminar/animal:::::::::::");
  console.log("el user id que me pasa el midelware", req._user.id);
  /////////////////////////
  const updateData = req.body;
  // Ejecutar la función tratarImg y almacenar el resultado en la variable 'url'
  const saveIMG = await eliminarAnimal(updateData);

  res.json({ message: "animal eliminado" });
});
///////////////////////////////////////////
///animales/cerca retorna los animales ceraca a la ubicacion del user
app.get("/all/animales", authMiddleware, async (req, res) => {
  const animales = await Animal.findAll();
  res.json({ animales });
});
/////////////////////////////////////////
///me/products retorna todos los productos registrados con el userid pasado por el meddelware
app.get("/me/animal", authMiddleware, async (req: any, res) => {
  ///este _user.id es el id que me pasa el authMiddleware
  const animal = await Animal.findAll({
    where: {
      userId: req._user.id,
    },
  });

  res.json({ animal });
});
///get todos las mascotas en db animal
app.get("/all/animales", authMiddleware, async (req, res) => {
  const animales = await Animal.findAll();
  res.json({ animales });
});

app.get("/all", async (req, res) => {
  const users = await User.findAll();
  const auth = await Auth.findAll();
  const animal = await Animal.findAll();
  res.json({ users, auth, animal });
});
//////////////////////////////////////////////////////////////////////////////////////////
app.post("/profile", async (req: any, res) => {
  const updateData = req.body;
  console.log({ updateData });

  // Ejecutar la función tratarImg y almacenar el resultado en la variable 'url'
  const saveIMG = await tratarImg(1, updateData);

  res.json({ saveIMG: saveIMG });
});
// Get anumales cerca (from lat&lng)
app.get("/animales-cerca", async (req, res) => {
  console.log("/animales-cerca");

  const { lat, lng } = req.query;
  index
    .search("", {
      aroundLatLng: `${lat}, ${lng}`,
      aroundRadius: 10000,
    })
    .then(({ hits }) => {
      res.send({ hits });
    });
});
//get animales registrados por un user
app.get("/animales-reportados", authMiddleware, async (req, res) => {
  console.log("/animales-reportados");

  const userId = req._user.id;
  index.search(userId).then(({ hits }) => {
    res.send({ hits });
  });
});
app.post("/email", async (req: any, res) => {
  console.log("reques a /email");
  const { nombre, telefono, dato, email } = req.body;
  console.log({ nombre, telefono, dato, email });

  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email, // Change to your recipient
    from: "cgovi66@gmail.com", // Change to your verified sender
    subject: `  ${nombre} tiene datos sobre tu mascota perdida `,
    text: `  ${nombre} Te a dejado este mensaje en nuestro box `,
    html: `<strong>encontramos tu mascota comunicate con este N°tel:${telefono}</strong>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      res.json({ messaje: "email enviado" });
    })
    .catch((error) => {
      console.error(error);
    });
});
//editar fata de user
app.put("/editar/user", authMiddleware, async (req, res) => {
  const { newName, newPass } = req.body;
  const userId = req._user.id;
  if (newName) {
    const user = await User.update(
      {
        fullname: newName,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  }
  if (newPass) {
    const auth = await Auth.update(
      {
        password: getSHA256ofstring(newPass),
      },
      {
        where: {
          user_id: userId,
        },
      }
    );
  }

  ///////////////////////////
  res.json({ message: "datos modificados" });
});
///access mapbox
app.get("/access/mapbox", authMiddleware, async (req, res) => {
  const access = process.env.MAPBOX_ACCESS;

  res.json({ access });
});
/////////////////////////////////////////////////////////////
app.use(express.static("dist"));
const ROOT_PATH = __dirname.replace("src/back", "");
app.get("*", (req, res) => {
  res.sendFile(ROOT_PATH + "dist/index.html");
});
