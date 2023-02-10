// import { initRouter } from "./routes";
//importo el router para que corra el router de vaadin
import "./router";

import { initPageRepMascota } from "./pages/page-rep-mascota";
import { initPageIngPass } from "./pages/page-ing-pass";
import { initPageMisDatos } from "./pages/page-mis-datos";
import { initPageIngresar } from "./pages/page-ingresar";
import { initPageMascotasCerca } from "./pages/page-mascotas-cerca";
import { initPageWelcome } from "./pages/page-welcome";
import { state } from "./state";
import { initSection1 } from "./components/section1";
import { initSection2 } from "./components/section2";
import { initSection3 } from "./components/section3";
import { initSection4 } from "./components/section4";
import { initSectionIngresar } from "./components/section-ingresar-mail";
import { initSectionIngresarDatos } from "./components/section-ingresar-datos";
import { initSectionIngrPass } from "./components/section-ing-pass";
import { initSectionRepMascota } from "./components/section-rep-mascota";
import { initPageMisMascotasReportadas } from "./pages/page-mis-mascotas-reportadas";

import "./components/element-geo";
import { initSection4MisMascotas } from "./components/section4-mis-mascotas";
import { initPageEditDatos } from "./pages/page-edit-datos";
import { initSectionEditDatos } from "./components/section-edit-datos";
(function () {
  state.init();

  ///pages
  initPageWelcome();
  initPageMascotasCerca();
  initPageIngresar();
  initPageMisDatos();
  initPageIngPass();
  initPageRepMascota();
  initPageMisMascotasReportadas();
  initPageEditDatos();

  // components
  initSection1();
  initSection2();
  initSection3();
  initSection4();
  initSectionIngresar();
  initSectionIngresarDatos();
  initSectionIngrPass();
  initSectionRepMascota();
  initSection4MisMascotas();
  initSectionEditDatos();
})();
