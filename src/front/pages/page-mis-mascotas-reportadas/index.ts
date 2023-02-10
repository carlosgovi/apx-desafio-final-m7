export function initPageMisMascotasReportadas() {
  class pagemismascotasreportadas extends HTMLElement {
    connectedCallback() {
      this.render();
      this.addListeners();
    }
    render() {
      const div = document.createElement("div");

      // agrego estilos desde el componente con style
      const style = document.createElement("style");
      style.textContent = `
          .contenedor{
            font-family: 'Unbounded', cursive;
           width: 100vw;
           
           
           }
          `;
      this.innerHTML = ` 
         <div class="contenedor">
         <section-uno>
         </section-uno>
          <section-cuatro-mis-mascotas>
          </section-cuatro-mis-mascotas>
          
          </div>
              `;

      this.appendChild(style);
    }
    addListeners() {}
  }
  customElements.define(
    "page-mis-mascotas-reportadas",
    pagemismascotasreportadas
  );
}
