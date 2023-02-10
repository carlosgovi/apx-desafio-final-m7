import { Router } from "@vaadin/router";
import { state } from "../../state";
import Dropzone from "dropzone";
import * as mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { access } from "fs";

export function initSectionRepMascota() {
  class sectionrepmascota extends HTMLElement {
    connectedCallback() {
      this.render();
      this.addListeners();
    }
    render() {
      const div = document.createElement("div");
      const wallpaperingresar = require("/src/front/img/perrowellcome7.jpg");

      // agrego estilos desde el componente con style
      const style = document.createElement("style");
      style.textContent = `

      
      

         .section_ingresar{

          width: 100vw;
          
          background-image: url("${wallpaperingresar}");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        display:flex;
        justify-content:center;
        align-items: center;
        
    }
        .card{
            width: 300px;
            margin:20px;
            background: rgb(50, 126, 224,0.3);
            border-radius: 40px 0 40px 0;
            display:flex;
            justify-content:center;
            align-items: center;
                 
        }
        .form{
            display:grid;
            justify-content:center;
            align-items: center;
            gap:15px;
        }
        .title-card{
          margin:0 auto;
            margin-bottom: 20px;
            color:white;
           display:flex;
           justify-content:center;
           align-items: center;
           font-size:30px;
           font-weight: 700;
           text-align:center;
        }
        .inputbox {
            position: relative;
            width: 100%;
          }
          
          .inputbox input {
            position: relative;
            width: 100%;
            padding: 20px 10px 10px;
            background: transparent;
            outline: none;
            box-shadow: none;
            border: none;
            color: #23242a;
            font-size: 1em;
            letter-spacing: 0.05em;
            transition: 0.5s;
            z-index: 10;
          }
          
          .inputbox span {
            margin:-23px;
            position: absolute;
            left: 0;
            padding: 0px 25px 10px;
            font-size: 1em;
            color: white;
            letter-spacing: 00.05em;
            transition: 0.5s;
            pointer-events: none;
          }
          
          .inputbox input:valid ~span,
          .inputbox input:focus ~span {
            color: white;
            transform: translateX(-10px) translateY(-38px);
            font-size: 0,75em;
          }
          
          .inputbox i {
            
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 2px;
            background: white;
            border-radius: 4px;
            transition: 0.5s;
            pointer-events: none;
            z-index: 9;
          }
          
          .inputbox input:valid ~i,
          .inputbox input:focus ~i {
            height: 44px;
          }
         
          .foto-input{
            overflow: hidden;
            color:white;
            display:grid;         
            align-items: center;
            justify-content: center;
            width: 200px;
            height: 200px;
            margin: 5px auto;
            background:none;
            border: solid white;
            border-radius:5px;
            border-radius: 40px 0 40px 0;
           }
          .button{
            width: 100%;
            height: 50px;
            
            right: 0px;
            opacity:0.5 ;
            border-radius: 0 0 40px 0;
            border:none;
            color: #5770c4;
            font-size:30px;
           font-weight: 200;
           font-family: 'Unbounded', cursive;
          }
          .mapa{

            width: 100%; 
            height: 100%;
            display:flex;
            align-items: center;
            justify-content: center;
          }
          .cont-map{
           
            width: 100%; 
            height: 200px;
          }
          .map{
           
            width: 100%; 
            height: 100%;
        }
        .text-geo{
          text-align:center;
          color:white;
          font_size:7px;
        }
           
          
        `;
      this.innerHTML = ` 
     
      
      
   
        <section class="section_ingresar">
            <div class="card">
                <form class="form">
                <div class="title-card">
                Reportar Mascota Perdida
                </div>
                                          

                                    <div class="inputbox">
                                    <input name="nombre" required="required" type="text">
                                    <span>Nombre</span>
                                    <i></i>
                                    </div>
                              

                                    <div class="cont_foto">
                                         <div name="foto" class="foto-input">Foto</div>
                                    </div>
                                    <div class="mapa">
                                                <div class="cont-map">
                                                     <div id="map" class="map" ></div>
                                                </div>
                                          </div>   
                                                
                                                
                                                <div id="geocoder" class="geocoder"></div>

                                                <div class="text-geo">
                                                Buscá un punto de referencia para reportar a tu mascota. Puede ser una dirección, un barrio o una ciudad.
                                                </div>

                                    <div >
                                        <button class="button" value="iniciar">Repotar</button>
                                    </div>                   

                </form>
            </div>
        </section>
       
       
            `;
      ////DROPZONE
      function dropzoneelem() {
        const dropzoneButton = document.querySelector(".foto-input");
        // la url la exige la librería
        const myDropzone = new Dropzone(dropzoneButton, {
          url: "/falsa",
          autoProcessQueue: false,
        });
        let imageDataURL;
        myDropzone.on("thumbnail", function (file) {
          // usando este evento pueden acceder al dataURL directamente
          imageDataURL = file.dataURL;

          state.setImg(imageDataURL);
        });
      }
      function form() {
        const form = document.querySelector(".form");
        form?.addEventListener("submit", (e: any) => {
          e.preventDefault();
          const nombre = e.target.nombre.value;
          state.sendForm(nombre);

          ///desde aca llamas al sendForm y enviar los datos cmpletos del form
          Router.go("/");
        });
      }
      // ///////////////////////////////////////////////--------------------------
      function Map() {
        navigator.geolocation.getCurrentPosition(
          successLocation,
          errorLocation,
          {
            enableHighAccuracy: true,
          }
        );

        function successLocation(position) {
          setupMap([position.coords.longitude, position.coords.latitude]);
        }

        function errorLocation() {
          setupMap([-73.990593, 40.740121]);
        }
        function setupMap(center) {
          const elelementodeldom: HTMLDivElement =
            document.querySelector("#map") || document.createElement("div");

          ///////////

          // console.log(process.env.MAPBOX_ACCESS);

          ////////////
          const map: mapboxgl.Map = new mapboxgl.Map({
            accessToken: process.env.MAPBOX_ACCESS,
            container: elelementodeldom,
            style: "mapbox://styles/mapbox/streets-v12",
            center: center,
            zoom: 15,
          });

          const nav: mapboxgl.NavigationControl =
            new mapboxgl.NavigationControl();
          const geocoder: MapboxGeocoder = new MapboxGeocoder({
            accessToken: process.env.MAPBOX_ACCESS as any,
            mapboxgl: mapboxgl,
          });
          const containerEl: HTMLDivElement =
            document.querySelector(".geocoder") ||
            document.createElement("div");

          map.addControl(nav);
          containerEl.appendChild(geocoder.onAdd(map));
          //////////////////////
          geocoder.on("result", function (e) {
            let [lng, lat] = e.result.center;
            console.log(lng, lat);
            state.setMascotaLocation(lng, lat);
          });
          ///////////////////////
          const geocoderInputEl: HTMLInputElement =
            document.querySelector(".mapboxgl-ctrl-geocoder--input") ||
            document.createElement("input");
        }
      }
      ////////////////////////////////////////////////////////---------------------------------
      Map();
      form();
      dropzoneelem();

      this.appendChild(style);
    }
    addListeners() {}
  }
  customElements.define("section-rep-mascota", sectionrepmascota);
}
