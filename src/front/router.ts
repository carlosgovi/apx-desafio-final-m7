import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "page-welcome" },
  { path: "/mascotas-cerca", component: "page-mascotas-cerca" },
  { path: "/ingresar", component: "page-ingresar" },
  { path: "/mis-datos", component: "page-mis-datos" },
  { path: "/ingresar-pass", component: "page-ing-pass" },
  { path: "/rep-mascota", component: "page-rep-mascota" },
  { path: "/rep-mascota-encontrada", component: "page-rep-mascota-encontrada" },
  {
    path: "/mis-mascotas-reportadas",
    component: "page-mis-mascotas-reportadas",
  },
  { path: "/editar-datos", component: "page-edit-datos" },
  { path: "/geo", component: "geo-page" },
]);
