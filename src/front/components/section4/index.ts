import { Router } from "@vaadin/router";
import { state } from "../../state";
export function initSection4() {
  class section4 extends HTMLElement {
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
        const currentState = state.getState();
        const lat = currentState.mascotaLocation.lat;
        const lng = currentState.mascotaLocation.lng;
        const params: { lat: number; lng: number } = { lat, lng };

        const getNearCommerces = await state.getAnimalesCerca(params);
        const RequestResponse = getNearCommerces.response;

        //////////////////////////////:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        RequestResponse.then((data) => {
          const nearestCommerces: [] = data.hits;

          if (nearestCommerces.length) {
            const elementoloko: any =
              document.querySelector(".conteiner") ||
              document.createElement("div");

            elementoloko.innerHTML = nearestCommerces
              .map((animal: any, index: number) => {
                if (animal.userId > 0) {
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
                }
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
            cursor: pointer;
            font-size: 52px;
            text-align: end;
            padding-right: 20px;
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
                                        <input name="nombre" required="required" type="text">
                                        <span>Tu Nombre</span>
                                     <i></i>
                                    </div>


                                    <div class="inputbox">
                                    <input name="telefono" required="required" type="tel">
                                    <span>Tu Telefono</span>
                                 <i></i>
                                </div>


                                <div class="inputbox">
                                <input name="dato" required="required" type="text">
                                <span>Donde lo viste</span>
                             <i></i>
                            </div>

                                    <div >
                                        <button class="button" value="iniciar">Repotar</button>
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
              //enviar form
              const formModal = modal.querySelector(".form-modal");
              formModal?.addEventListener("submit", (e: any) => {
                e.preventDefault();
                const nombre = e.target.nombre.value;
                const telefono = e.target.telefono.value;
                const dato = e.target.dato.value;
                ///////Enviar el mail a el user que lo reporto///////////
                const email: any = nearestCommerces[index] as any;

                state.sendEmail(nombre, telefono, dato, email.email);
                closeModal();
                Router.go("/");
              });
            };

            // Agregar evento de clic a cada card
            nearestCommerces.forEach((_, index) => {
              const card: any = document.querySelector(`#card-${index}`);

              if (card) {
                card.addEventListener("click", () => {
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
  customElements.define("section-cuatro", section4);
}
