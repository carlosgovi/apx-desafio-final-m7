import { cloudinary } from "../lib/cloudinary";
import { index } from "../lib/algolia";
import { User, Animal, Auth } from "../models/model";
async function tratarImg(userId, updateData) {
  const dataURI = updateData.img;

  // Convertir data URI en un buffer

  // Subir imagen a Cloudinary
  const imagen = await cloudinary.uploader.upload(
    dataURI,
    { resource_type: "image", discard_original_filename: true, whidth: 1000 }
    //
  );
  const updateDataAnimal = {
    fullname: updateData.fullname,
    lat: updateData.lat,
    lng: updateData.lng,
    img: imagen.secure_url,
  };
  console.log("updateDataAnimal====:::::", updateDataAnimal);

  // User.update(
  //   {
  //     fullname: updateData.nombre,
  //     bio: updateData.bio,
  //     img: imagen.secure_url,
  //   },
  //   { where: { id: userId } }
  // );
  ///este _user.id es el id que me pasa el authMiddleware
  const animal = await Animal.create({
    ///todos los campos que tenga en el body los voy a usar para los products ((igual el modelo de products tiene solo dos title y price))
    fullname: updateData.fullname,
    lat: updateData.lat,
    lng: updateData.lng,
    img: imagen.secure_url,
    userId: userId,
    email: updateData.email,
  });

  const algolia = await index.saveObject({
    objectID: animal.get("id"),
    userId: animal.get("userId"),

    fullname: animal.get("fullname"),
    email: animal.get("email"),
    img: imagen.secure_url,
    _geoloc: {
      lat: animal.get("lat"),
      lng: animal.get("lng"),
    },
  });

  return { animal, algolia };
}
///////////////////////////////////////////////////////////////////
async function editImg(userId, updateData) {
  const dataURI = updateData.img;
  const objectID = updateData.algoliaAnimalId;
  // Convertir data URI en un buffer
  console.log({ objectID });

  // Subir imagen a Cloudinary
  const imagen = await cloudinary.uploader.upload(
    dataURI,
    { resource_type: "image", discard_original_filename: true, whidth: 1000 }
    //
  );
  const updateDataAnimal = {
    fullname: updateData.fullname,
    lat: updateData.lat,
    lng: updateData.lng,
    img: imagen.secure_url,
  };
  console.log("datos pasados====:::::", updateDataAnimal);

  // User.update(
  //   {
  //     fullname: updateData.nombre,
  //     bio: updateData.bio,
  //     img: imagen.secure_url,
  //   },
  //   { where: { id: userId } }
  // );
  ///este _user.id es el id que me pasa el authMiddleware
  const animal = await Animal.update(
    {
      ///todos los campos que tenga en el body los voy a usar para los products ((igual el modelo de products tiene solo dos title y price))
      fullname: updateData.fullname,
      lat: updateData.lat,
      lng: updateData.lng,
      img: imagen.secure_url,
      userId: userId,
      email: updateData.email,
    },
    {
      where: {
        id: objectID,
      },
    }
  );
  const animalUpdateado = await Animal.findByPk(objectID);
  console.log({ animalUpdateado });
  console.log(
    "vamos a ver si este dato esta bein ",
    animalUpdateado.get("fullname")
  );

  const algolia = await index.partialUpdateObject({
    objectID: animalUpdateado.get("id"),
    userId: animalUpdateado.get("userId"),
    fullname: animalUpdateado.get("fullname"),
    email: animalUpdateado.get("email"),
    img: imagen.secure_url,
    _geoloc: {
      lat: animalUpdateado.get("lat"),
      lng: animalUpdateado.get("lng"),
    },
  });

  console.log({ algolia });

  return { animal };
}

async function eliminarAnimal(updateData) {
  const algolia = await index.partialUpdateObject({
    objectID: updateData.algoliaAnimalId,
    userId: 0,
  });
  return algolia;
}

export { tratarImg, editImg, eliminarAnimal };
