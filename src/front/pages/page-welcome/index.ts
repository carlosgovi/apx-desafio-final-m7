import { state } from "../../state";
import { Router } from "@vaadin/router";
import Dropzone from "dropzone";

export function initPageWelcome() {
  class pagewelcome extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
    }
    render() {
      const div = document.createElement("div");

      // agrego estilos desde el componente con style
      const style = document.createElement("style");
      style.innerHTML = `
      .contenedor{
        font-family: 'Unbounded', cursive;
       width: 100vw;
       
       
       }
      `;
      div.innerHTML = ` 
     <div class="contenedor">
      <section-uno>
      </section-uno>
      <section-dos>
      </section-dos>
      <section-tres>
      </section-tres>
      <section-cuatro>
      </section-cuatro>
      </div>
          `;

      this.shadow.appendChild(div);

      this.shadow.appendChild(style);
    }
  }
  customElements.define("page-welcome", pagewelcome);
}

// const dropzoneButton = div.querySelector(".foto-input");
// // la url la exige la librería
// const myDropzone = new Dropzone(dropzoneButton, {
//   url: "/falsa",
//   autoProcessQueue: false,
// });
// let imageDataURL;
// myDropzone.on("thumbnail", function (file) {
//   // usando este evento pueden acceder al dataURL directamente
//   imageDataURL = file.dataURL;

//   state.setImg(imageDataURL);
// });

// const form = div.querySelector(".form");
// form?.addEventListener("submit", (e: any) => {
//   e.preventDefault();
//   const nombre = e.target.fullname.value;
//   const textarea = e.target.bio.value;

//   console.log({ nombre, textarea });
//   state.setNombre(nombre);
//   state.setBio(textarea);
//   console.log(state.getState());
//   state.sendForm();
// });
