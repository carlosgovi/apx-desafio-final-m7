import { Router } from "@vaadin/router";
import { state } from "../../state";
import Dropzone from "dropzone";
import * as mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
export function initSection4MisMascotas() {
  class section4mismascotas extends HTMLElement {
    connectedCallback() {
      this.render();
      this.addListeners();
    }
    render() {
      const div = document.createElement("div");
      const perroChica = require("/src/front/img/perrowellcome5.jpeg");

      // agrego estilos desde el componente con style
      const style = document.createElement("style");

      style.textContent = `
     
              
           
             .section4{
              width: 100vw;
              margin-top:2%;
             
            
             }
             .conteiner{
                display: grid;
                gap:2%;
                align-items: center;
                
             }
             @media  (min-width: 500px) {
                .conteiner {
                  grid-template-columns: 1fr 1fr;
                  
                }  
              }
              @media  (min-width: 1100px) {
                .conteiner {
                  grid-template-columns: 1fr 1fr 1fr 1fr ;
                }  
              }
             .title{
              font-size:20px;
              margin: 30px 10px;
             }
             .subtitle{
              font-size:40px;
              margin: 10px 10px;
             }
             .contimg{
                
             width: 100vw;
             height:800px;
             
             background-image: url("${perroChica}");
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
             }
             .parrafo{
              font-size:20px;
              margin: 10px 20px;
              font-weight: 250;
              text-align: center;
             }



             .card {
                margin:0 auto;
                overflow: hidden;
                width: 290px;
                height: 354px;
                background: #f0f0f0;
                border-radius: 10px;
                text-align: center;
                transition: all 0.5s;
               }
               
               .card:hover {
                overflow: hidden;
                box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.623);
                background-color: #98acb9;
               }
               
               .card .blob {
                overflow: hidden;
                height: 10px;
                width: 75%;
                border-radius: 0 0 30px 30px;
                margin: 0 auto;
                background-color: #98acb9;
                visibility: visible;
                transition: all 0.3s;
               }
               
               .card:hover .blob {
                overflow: hidden;
                height: 0;
                
               }
               
               .card .img {
                overflow: hidden;
                display: flex;
                margin: 30px auto 10px auto;
                width: 110px;
                height: 110px;
                background-color: #98acb9;
                border-radius: 50%;
                font-size: 11px;
                justify-content: center;
                align-items: center;
                transition: all 0.5s;
                
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
               }
               
               .card:hover .img {
                overflow: hidden;
                width: 100%;
                height: 70%;
                border-radius: 10px 0 0;
                margin: 0 auto;
                background-color: #f0f0f0;
                z-index: 99999;
               }
               
               .card h2 {
                overflow: hidden;
                padding: 15px 10px;
                font-size: 25px;
                transition: all 0.1s;
                z-index: -99;
                line-height: 17px;
               }
               
               .card span {
                overflow: hidden;
                font-size: 18px;
               }
               
               .card:hover h2 {
                overflow: hidden;
                opacity: 0;
                
                position: absolute;
                transition: all 0.5s;
               }
               
               .card>p {
               
                overflow: hidden;
                opacity:0 ;
                transition: all 0.75s;
                
               }
               .parrafo1{
                text-align: center;
                overflow: hidden;
                opacity:0 ;
                transition: all 0.75s;
                font-size:15px
               }
             
               
               .card>p>svg {
                overflow: hidden;
                padding: 5px;
               }
               
               .card:hover .parrafo1 {
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                bottom: 15px;
                left: 35px;
                opacity: 1;
                transition: all 0.1s;
                
                text-align: justify;
               }
               .footer{
                display:grid;
                height:250px;
                color: #ffffff;
                background-color: #333333;
               }
              
            `;
      this.innerHTML = ` 
         
            
            <section class="section4">
              <div class="conteiner" id="conteiner">
              
              </div>
                        <div class="contimg">
                        </div>
                        
                        <div class="footer">
                            <div class="parrafo">
                            ¡Queremos ayudarte!
                            </div>
                            <div class="parrafo">
                            ¡Porque sabemos lo que se siente perder una mascota, hoy estamos juntos en tu búsqueda!
                            </div>
                        </div>
                       
            </section>
             
            
            
                `;
      this.appendChild(style);
      async function getAnimalesCerca() {
        const getNearCommerces = await state.getAnimalesDeUnUser();
        const RequestResponse = getNearCommerces.response;
        console.log("respuesta de la busqueda de algolia", { RequestResponse });

        //////////////////////////////:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        RequestResponse.then((data) => {
          const nearestCommerces: [] = data.hits;
          console.log("los commerss", nearestCommerces);
          if (nearestCommerces.length) {
            const elementoloko: any =
              document.querySelector(".conteiner") ||
              document.createElement("div");

            console.log({ elementoloko });

            elementoloko.innerHTML = nearestCommerces
              .map((animal: any, index: number) => {
                const card = `
              <div class="card" id="card-${index}">
              
              <div class="blob"></div>
                  <span class="img" style="background-image: url(${animal.img})"></span>
                  <h2>${animal.fullname}<br><span></span></h2>
                  
                  <div>
                  <p class="parrafo1">Seleccioname si me has visto en la calle y notifica a mi dueño</p>
                  </div>
              </div>
              
                       `;

                return card;
              })
              .join("");

            // Función para mostrar la modal
            const showModal = (index: number) => {
              const modal = document.createElement("div");
              const style = document.createElement("style");
              modal.classList.add("modal");
              style.textContent = `
             
            .modal-content{
              position: absolute;
              top: 50%;
              width: 100vw;
              font-family: 'Unbounded', cursive;
              width: 100vw;
            display:flex;
            justify-content:center;
            align-items: center;
            
        }

        .card-modal{
            width: 300px;
            
            background: rgba(238, 211, 122, 0.9);
            border-radius: 40px 0 40px 0;
            display:flex;
            justify-content:center;
            align-items: center;
                 
        }
        .form-modal{
            display:grid;
            justify-content:center;
            align-items: center;
            gap:15px;
        }
        .title-card-modal{
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
            margin: 25px -10px;
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
            cursor: pointer;
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
            cursor: pointer;
            right: 0px;
            opacity:0.5 ;
            border-radius: 0 0 40px 0;
            border:none;
            color: #5770c4;
            font-size:30px;
           font-weight: 200;
           font-family: 'Unbounded', cursive;
          }
          .name-animal{
            margin:0 auto;
            margin-bottom: 20px;
            color:grey;
           display:flex;
           justify-content:center;
           align-items: center;
           font-size:30px;
           font-weight: 700;
           text-align:center;
          }
          .close{
            font-size: 52px;
            text-align: end;
            padding-right: 20px;
            cursor: pointer;
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
          color:white;
          font_size:7px;
          text-align:center;
        }
        #eliminar{
            text-align:center;
            color:red;
            cursor: pointer;
        }
 
          
        `;
              modal.innerHTML = `
           <div class="modal-content">
            <div class="card-modal">
              <form class="form-modal">
              <span class="close">&times;</span>
                  <div class="title-card-modal">
                    Reportar Mascota Perdida
                    </div>
                    
                    <div class="name-animal">${
                      (nearestCommerces[index] as any).fullname
                    }</div>

                                    <div class="inputbox">
                                        <input name="nombre" value=${
                                          (nearestCommerces[index] as any)
                                            .fullname
                                        } required="required" type="text">
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
                                                    <div class="button" id="eliminar" value="iniciar">Eliminar Registro</div>
                                                    </div>   
                                    <div >
                                        <button class="button" value="iniciar">Editar</button>
                                    </div>                   

                                    </form>
                         </div>
              </div>
            `;
              modal.appendChild(style);
              document.body.appendChild(modal);

              // Función para cerrar la modal
              const closeModal = () => {
                modal.remove();
              };

              // Agregar evento de clic al botón de cerrar
              const close: any = modal.querySelector(".close");
              close.addEventListener("click", closeModal);
              //agrego evento al  div eliminar registro
              const elEliminarRegistro = modal.querySelector("#eliminar");
              elEliminarRegistro?.addEventListener("click", () => {
                const algoliaAnimalId = (
                  nearestCommerces[index] as { objectID }
                ).objectID;
                console.log("btn eliminar");
                state.eliminarAnimal(algoliaAnimalId).then((data) => {
                  console.log(
                    "respuesta del fetch a ::eliminar Animal:::",
                    data
                  );
                });
              });
              //enviar form
              const formModal = modal.querySelector(".form-modal");
              formModal?.addEventListener("submit", (e: any) => {
                e.preventDefault();
                const nombre = e.target.nombre.value;

                ///////Enviar datos al state para la edit de la db///////////
                // const email: any = nearestCommerces[index] as any;
                const algoliaAnimalId = (
                  nearestCommerces[index] as { objectID }
                ).objectID;

                console.log(algoliaAnimalId);
                state.editAnimal(algoliaAnimalId, nombre);

                closeModal();
                Router.go("/");
              });
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

              async function Map() {
                navigator.geolocation.getCurrentPosition(
                  successLocation,
                  errorLocation,
                  {
                    enableHighAccuracy: true,
                  }
                );

                function successLocation(position) {
                  setupMap([
                    position.coords.longitude,
                    position.coords.latitude,
                  ]);
                }

                function errorLocation() {
                  setupMap([-73.990593, 40.740121]);
                }
                async function setupMap(center) {
                  const elelementodeldom: HTMLDivElement =
                    document.querySelector("#map") ||
                    document.createElement("div");

                  const map: mapboxgl.Map = new mapboxgl.Map({
                    accessToken: process.env.MAPBOX_ACCESS as any,
                    container: elelementodeldom,
                    style: "mapbox://styles/mapbox/streets-v12",
                    center: center,
                    zoom: 12,
                  });
                  console.log(elelementodeldom);
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

                  const getNearCommerces = await state.getAnimalesDeUnUser();
                  const RequestResponse = getNearCommerces.response;

                  RequestResponse.then((data) => {
                    const listaAnimales = data.hits;
                    console.log(listaAnimales);

                    for (const aminal of listaAnimales) {
                      const marker: mapboxgl.Marker = new mapboxgl.Marker()
                        .setLngLat([aminal._geoloc.lng, aminal._geoloc.lat])
                        .addTo(map);
                    }
                  });
                }
              }
              dropzoneelem();
              Map();
            };

            // Agregar evento de clic a cada card
            nearestCommerces.forEach((_, index) => {
              const card: any = document.querySelector(`#card-${index}`);

              if (card) {
                card.addEventListener("click", () => {
                  console.log("cliccckk");

                  showModal(index);
                });
              }
            });
          }
        });
      }
      getAnimalesCerca();
    }
    addListeners() {}
  }
  customElements.define("section-cuatro-mis-mascotas", section4mismascotas);
}
