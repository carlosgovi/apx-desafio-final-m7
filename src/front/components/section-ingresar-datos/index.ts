import { Router } from "@vaadin/router";
import { state } from "../../state";

export function initSectionIngresarDatos() {
  class sectioningresardatos extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
    }
    render() {
      const div = document.createElement("div");
      const wallpaperingresar = require("/src/front/img/perrowellcome7.jpg");

      // agrego estilos desde el componente con style
      const style = document.createElement("style");
      style.innerHTML = `

        
         .section_ingresar{

          width: 100vw;
          height: 500px;
          background-image: url("${wallpaperingresar}");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        display:flex;
        justify-content:center;
        align-items: center;
        
    }
        .card{
            width: 190px;
            
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
            margin-bottom: 20px;
            color:white;
           display:flex;
           justify-content:center;
           align-items: center;
           font-size:30px;
           font-weight: 700;
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
          .button{
            width: 100%;
            height: 50px;
            position: relative;
            bottom: -50px;
            right: 0px;
            opacity:0.5 ;
            border-radius: 0 0 40px 0;
            border:none;
            color: #5770c4;
            font-size:30px;
           font-weight: 200;
           font-family: 'Unbounded', cursive;
          }
        `;
      div.innerHTML = ` 
     
        <section class="section_ingresar">
            <div class="card">
                <form class="form">
                <div class="title-card">
                Ingresar
                </div>
                               <div class="inputbox">
                                    <input name="nombre" required="required" type="text">
                                    <span>Nombre</span>
                                    <i></i>
                                </div>  
                                                       

                                    <div class="inputbox">
                                    <input name="password" required="required" type="password">
                                    <span>Password</span>
                                    <i></i>
                                </div>
                                <div class="inputbox">
                                    <input name="rep_password" required="required" type="password ">
                                    <span>Repetir Pass</span>
                                    <i></i>
                                </div>  
                                    <div >
                                        <button class="button" value="iniciar">Iniciar</button>
                                    </div>                   

                </form>
            </div>
        </section>
        
            `;

      function form() {
        const form = div.querySelector(".form");
        form?.addEventListener("submit", (e: any) => {
          e.preventDefault();

          const nombre = e.target.nombre.value;
          const password = e.target.password.value;
          const rep_password = e.target.rep_password.value;
          if (password != rep_password) {
            alert("Los Password no Coinsiden");
          } else {
            console.log({ nombre, password, rep_password });
            state.singup(nombre, password);
            Router.go("/");
          }
        });
      }
      form();
      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
  }
  customElements.define("section-ingresar-datos", sectioningresardatos);
}
