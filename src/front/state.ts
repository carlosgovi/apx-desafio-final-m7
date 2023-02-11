const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000"; //url del server

import map from "lodash/map";
import { Router } from "@vaadin/router";

const state = {
  //donde guardo los datos
  data: {
    userLocation: {
      lat: 0,
      lng: 0,
    },
    mascotaLocation: {
      lat: 0,
      lng: 0,
    },
    img: "",
    email: "",
    token: "",
    fullname: "",
    telefono: "",
    dondeLoVio: "",
  },
  //  listeners
  listeners: [],

  init() {
    if (window.localStorage.getItem("state")) {
      const local: any = window.localStorage.getItem("state");
      const localParseado = JSON.parse(local);
      console.log("localStorage:::::::", localParseado);
      this.setState(localParseado);
      /////////////////////////////////////////////////////////
      // window.localStorage.removeItem("state");
    }
  },

  ///////////////////////////////////
  ///  tomo los datos
  getState() {
    return this.data;
  },
  /// seteo los datos pisando los anteriores
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("state", JSON.stringify(newState));
  },
  setNombre(newNombre) {
    console.log("setnombre");

    const currenState = this.getState();
    currenState.fullName = newNombre;
    this.setState(currenState);
  },
  saveLocation(lat, lng) {
    const currenState = this.getState();
    currenState.userLocation.lat = lat;
    currenState.userLocation.lng = lng;

    this.setState(currenState);
    console.log(this.getState());
  },
  setMascotaLocation(lng, lat) {
    const currenState = this.getState();

    currenState.mascotaLocation.lng = lng;
    currenState.mascotaLocation.lat = lat;

    this.setState(currenState);
    console.log("::::::state de mascotas loc:::", this.getState());
  },
  setEmail(email) {
    const currenState = this.getState();
    currenState.email = email;

    this.setState(currenState);
  },
  authMail() {
    const { email } = this.getState();
    return fetch(API_BASE_URL + "/auth/email", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // si la respuesta es ok
          return response.json().then((data) => {
            console.log("respuesta del fetch a ::auth/email:::", data);
            //si el email existe voy a una page donde ingrese el pass
            Router.go("/ingresar-pass");
          });
        } else if (response.status === 400) {
          // si se pasa un error 400
          return response.json().then((errorObj) => {
            //si el email no existe cargo  los datos en la siguiente page y creo el user
            console.log(errorObj);
            Router.go("/mis-datos");
          });
        }
      })

      .catch((err) => console.log("Solicitud fallida", err)); // Capturar errores;
  },
  singup(fullname, password) {
    const { email } = this.getState();
    return fetch(API_BASE_URL + "/auth", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        fullname: fullname,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("respuesta del fetch a ::/auth::", data);
      })
      .catch((err) => console.log("Solicitud fallida", err)); // Capturar errores;
  },
  singIng(password) {
    const { email } = this.getState();
    return fetch(API_BASE_URL + "/auth/token", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("respuesta del fetch a ::/auth/token:::", data);
        if (data.error) {
          return alert(data.error);
        }
        const currentState = this.getState();
        currentState.token = data.token;
        currentState.fullname = data.fullname;
        this.setState(currentState);
        Router.go("/");
      })
      .catch((err) => console.log("Solicitud fallida", err)); // Capturar errores;
  },

  setImg(newImg) {
    console.log("setImg");

    const currenState = this.getState();
    currenState.img = newImg;
    this.setState(currenState);
  },
  sendForm(fullname) {
    const { mascotaLocation, img, token, email } = this.getState();
    console.log("nombre", fullname);
    console.log("mascotaLocation", mascotaLocation);
    console.log("img", img);

    fetch(API_BASE_URL + "/animal", {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        fullname,
        lat: mascotaLocation.lat,
        lng: mascotaLocation.lng,
        img,
        email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("respuesta del fetch a ::profile:::", data);
      });
  },
  sendEmail(nombre, telefono, dato, email) {
    fetch(API_BASE_URL + "/email", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        telefono,
        dato,
        email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("respuesta del fetch a ::email:::", data);
      });
  },
  async getAnimalesCerca(params: { lat: number; lng: number }) {
    const res = await fetch(
      `${API_BASE_URL}/animales-cerca?lat=${params.lat}&lng=${params.lng}`,
      {
        method: "GET",
      }
    );
    return { response: res.json(), status: res.status };
  },
  async getAnimalesDeUnUser() {
    const currentState = state.getState();
    const token = currentState.token;
    const res = await fetch(`${API_BASE_URL}/animales-reportados`, {
      method: "GET",

      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return { response: res.json(), status: res.status };
  },
  //modifica el registro de un aminal
  async editAnimal(algoliaAnimalId, fullname) {
    const { mascotaLocation, img, token, email } = this.getState();

    const res = await fetch(`${API_BASE_URL}/editar/animal`, {
      method: "put",

      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        algoliaAnimalId,
        fullname,
        lat: mascotaLocation.lat,
        lng: mascotaLocation.lng,
        img,
        email,
      }),
    });
    return { response: res.json(), status: res.status };
  },
  ///editar en algolia el userId para que el registro no se pueda visualizar
  async eliminarAnimal(algoliaAnimalId) {
    const { token } = this.getState();

    const res = await fetch(`${API_BASE_URL}/eliminar/animal`, {
      method: "put",

      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        algoliaAnimalId,
      }),
    });
    return { response: res.json(), status: res.status };
  },
  ///editar datos de user
  async editUser(newName, newPass) {
    const { token } = this.getState();

    const res = await fetch(`${API_BASE_URL}/editar/user`, {
      method: "put",

      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        newName,
        newPass,
      }),
    });
    return { response: res.json(), status: res.status };
  },
  //traer los tokensacces de mapbox
  async getAccesMapbox() {
    const { token } = this.getState();

    return await fetch(`${API_BASE_URL}/access/mapbox`, {
      method: "get",

      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },
};

export { state };
