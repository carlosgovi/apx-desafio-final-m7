export function initSection2() {
  class section2 extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
    }
    render() {
      const div = document.createElement("div");

      const gato = require("/src/front/img/gatowellcome.jpg");
      // agrego estilos desde el componente con style
      const style = document.createElement("style");
      style.innerHTML = `
  
         
           .section2{
            width: 100vw;
            
           }
           .conteiner{
            display:grid;
            align-items: center;
            justify-content: center;
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
            width: 300px;
            height: 400px;
           margin-left:2%;
            background-image: url("${gato}");
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
          `;
      div.innerHTML = ` 
       
          
          <section class="section2">
            <div class="conteiner">
                <div class="title">
                PET'S LOVE
                </div>
                <div class="subtitle">
                ¡Encontrá a tu mejor amigo en pocas horas!
                </div>
                        <div class="contimg" >
            
            
                         </div>
                 <div class="parrafo">
                <p> Vamos a ayudarte a viralizar la imagen de tu mascota perdida. Logramos rastreos inteligentes a través de publicidad geolocalizada en redes sociales.</p>

                <p>Aseguramos llegar a tus vecinos y a miles de personas de la zona donde se extravió tu mejor amigo...</p>
                 </div>
            </div>
          </section>
           
          
          
              `;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
  }
  customElements.define("section-dos", section2);
}
