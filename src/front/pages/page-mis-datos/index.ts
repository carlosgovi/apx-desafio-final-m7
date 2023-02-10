export function initPageMisDatos() {
  class initPageMisDatos extends HTMLElement {
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
           
           <section-ingresar-datos>
           </section-ingresar-datos>
            
            
            </div>
                `;

      this.shadow.appendChild(div);

      this.shadow.appendChild(style);
    }
  }
  customElements.define("page-mis-datos", initPageMisDatos);
}
