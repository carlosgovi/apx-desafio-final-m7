import { Router } from "@vaadin/router";

import { state } from "../../state";

export function initSection1() {
  class section1 extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
    }
    render() {
      const div = document.createElement("div");
      const email = state.getState().email;
      const wallpaperSec1 = require("/src/front/img/perrowellcome.jpg");
      const logoDog = require("/src/front/img/dog.png");
      const buscador = require("/src/front/img/buscador1.png");
      // agrego estilos desde el componente con style
      const style = document.createElement("style");
      style.innerHTML = `

        
         .section1{
          width: 100vw;
          height: 500px;
          background-image: url("${wallpaperSec1}");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
  
         }
         .logos_white{
          cursor: pointer;
          width: 144px;
          height: 157px;
         }
         .menu_lupa{
          width: 120px;
         }
         .lupa_white{
          cursor: pointer;
          
          width: 120px;
          height: 120px;
         }
         .text_lupa{
          
          color:white;
          font-size:11px
          font-weight: 100;
         }
         .header{
          width: 100vw;
          height: 75px;
          display:grid;
          justify-content: center;
          align-items: center;
         }
         .burger {
          position: relative;
          width: 40px;
          height: 30px;
          background: transparent;
          cursor: pointer;
        }
        
        
        #burger{
          display:none
        }
        .burger span {
          display: block;
          position: absolute;
          height: 4px;
          width: 100%;
          background: white;
          border-radius: 9px;
          opacity: 1;
          left: 0;
          transform: rotate(0deg);
          transition: .25s ease-in-out;
        }
        
        .burger span:nth-of-type(1) {
          top: 0px;
          transform-origin: left center;
        }
        
        .burger span:nth-of-type(2) {
          top: 50%;
          transform: translateY(-50%);
          transform-origin: left center;
        }
        
        .burger span:nth-of-type(3) {
          top: 100%;
          transform-origin: left center;
          transform: translateY(-100%);
        }
        
        .burger input:checked ~ span:nth-of-type(1) {
          transform: rotate(45deg);
          top: 0px;
          left: 5px;
        }
        
        .burger input:checked ~ span:nth-of-type(2) {
          width: 0%;
          opacity: 0;
        }
        
        .burger input:checked ~ span:nth-of-type(3) {
          transform: rotate(-45deg);
          top: 28px;
          left: 5px;
        }
        .logo{
          width: 100vw;
          height: 85%;
          display:grid;
          grid-template-columns: auto auto;
          justify-content: space-between;
          align-items: flex-end;
          
  
        }
        .menu-burguer{
          transform: translateY(-2000px);
          transition: 400ms;
            overflow: auto;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background-color:rgba(0, 0, 0, 0.7);
            display:grid;
            aling-items:center;
            justify-content: center;
        
        }
        
        .div-ancla{
          cursor: pointer;
          padding-top:60px;
          color: white;
          width: 50vw;
          display:flex;
            aling-items:center;
            justify-content: center;
            flex-direction: column;
            font-size:30px;
            text-align: center;
            font-weight: 200;
           
            
        }
        #user{
          display:none;
          color:rgb(96, 170, 240);
          margin-top:80px;
          font-size:20px;
          
        }
        #cerrar{
          display:none;
          padding-top: 20px;
        }
        `;

      div.innerHTML = ` 
     
        <div >
        <section class="section1">
        <div class="menu-burguer">
        

        <div class="div-ancla" id="el-mis-datos"><div>Mis datos</div></div>
        <div class="div-ancla" id="mis-rep-mascotas"><div>Mis Mascotas Reportadas</div></div>
        <div class="div-ancla" id="rep-mascotas" ><div>Reportar Mascota</div></div>
        
        <div class="div-ancla" id="iniciar"><div>iniciar sesion</div></div>

        <div class="div-ancla" id="user"><div>${email}</div></div>
        <div class="div-ancla" id="cerrar"><div>Cerrar Sesion</div></div>
       
        </div>
        <header class="header">
        <label for="burger" class="burger">
        <input id="burger" name="check" type="checkbox">
            <span></span>
            <span></span>
            <span></span>
        </label>
        </header>
        <div class="logo">
                  <div>
                  <img class="logos_white" src="${logoDog}">
                  </div>
               
                  <div class="menu_lupa">
                  
                  
                  <div class="text_lupa">
                  Mascotas cerca:
                  
                  </div> 
                  <img class="lupa_white" src="${buscador}">
                  
                  </div>
                  
                  

        </div>
        </section>
         
        
        </div>
            `;
      function irInicio() {
        const logo = div.querySelector(".logos_white");
        logo?.addEventListener("click", () => {
          Router.go("/");
        });
      }

      function menuBurguer() {
        const menu = div.querySelector("#burger");
        menu?.addEventListener("click", (e: any) => {
          const menuburguer: any = div.querySelector(".menu-burguer");

          if (menuburguer.style.transform === "translateY(0px)") {
            return (menuburguer.style.transform = "translateY(-2000px)");
          } else {
            menuburguer.style.transform = "translateY(0px)";
          }
        });
      }
      const funcionInit = () => {
        const onUbicacionConcedida = (ubicacion) => {
          console.log("Tengo la ubicación: ", ubicacion);
          console.log("latitud", ubicacion.coords.latitude);
          console.log("longitud", ubicacion.coords.longitude);
          state.saveLocation(
            ubicacion.coords.latitude,
            ubicacion.coords.longitude
          );
        };

        const onErrorDeUbicacion = (err) => {
          console.log("Error obteniendo ubicación: ", err);
        };

        const opcionesDeSolicitud = {
          enableHighAccuracy: true, // Alta precisión
          maximumAge: 0, // No queremos caché
          timeout: 10000, // Esperar solo 10 segundos
        };
        // Solicitar
        navigator.geolocation.getCurrentPosition(
          onUbicacionConcedida,
          onErrorDeUbicacion,
          opcionesDeSolicitud
        );
      };
      function userUbicacion() {
        const lupas = div.querySelector(".lupa_white");
        lupas?.addEventListener("click", () => {
          funcionInit();

          Router.go("/mascotas-cerca");
        });
      }
      function repMascota() {
        const lupas = div.querySelector("#rep-mascotas");
        const currentState = state.getState();
        lupas?.addEventListener("click", () => {
          if (currentState.token) {
            Router.go("/rep-mascota");
          } else {
            Router.go("/ingresar");
          }
        });
      }
      function iniciarSesion() {
        const iniciar = div.querySelector("#iniciar");
        iniciar?.addEventListener("click", () => {
          Router.go("/ingresar");
        });
      }

      function sesionIniciada() {
        const currentState = state.getState();
        const iniciar_sesion: any = div.querySelector("#iniciar");
        const user_email: any = div.querySelector("#user");
        const cerrar: any = div.querySelector("#cerrar");

        if (currentState.token) {
          iniciar_sesion.style.display = "none";
          user_email.style.display = "flex";
          cerrar.style.display = "flex";
        }
      }
      function cerrarSersion() {
        const cerrar: any = div.querySelector("#cerrar");
        cerrar.addEventListener("click", () => {
          const currentState = state.getState();
          currentState.token = "";
          currentState.email = "";
          state.setState(currentState);
          window.location.reload();
        });
      }
      function misMascotasReportadas() {
        const misMascotasReportadas: HTMLElement =
          div.querySelector("#mis-rep-mascotas") ||
          document.createElement("div");
        const currentState = state.getState();
        misMascotasReportadas.addEventListener("click", () => {
          if (currentState.token) {
            return Router.go("/mis-mascotas-reportadas");
          } else {
            Router.go("/ingresar");
          }
        });
      }
      function misDatos() {
        const misDatos: HTMLElement =
          div.querySelector("#el-mis-datos") || document.createElement("div");
        const currentState = state.getState();
        misDatos.addEventListener("click", () => {
          if (currentState.token) {
            return Router.go("/editar-datos");
          } else {
            Router.go("/ingresar");
          }
        });
      }
      iniciarSesion();
      userUbicacion();
      menuBurguer();
      sesionIniciada();
      cerrarSersion();
      irInicio();
      repMascota();
      misMascotasReportadas();
      misDatos();
      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
  }
  customElements.define("section-uno", section1);
}
