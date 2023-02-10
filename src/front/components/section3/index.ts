export function initSection3() {
  class section3 extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
    }
    render() {
      const div = document.createElement("div");
      const cats = require("/src/front/img/gatos.jpeg");
      const doggi = require("/src/front/img/perrowellcome4.jpeg");
      const perro1 = require("/src/front/img/perrowellcome3.jpeg");
      // agrego estilos desde el componente con style
      const style = document.createElement("style");
      style.innerHTML = `
    
           
             .section3{
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
           
             .parrafo{
                font-size: 1rem;
              margin: 10px 20px;
              font-weight: 300;
              text-align: center;
              text-align: end;
              margin-top:50%;
              
             }
             .card1{
                display:grid;
                background-image: url("${perro1}");
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                color:white;  
                min-height:500px ;
                
             }
             .card2{
                display:grid;
                display:grid;
                align-items: center;
                justify-content: center;
                
             }
             .doggi{
                width: 300px;
                height: 300px ;
                border-radius: 50%;
                background-image: url("${doggi}");
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                margin:0px auto;
                margin-top:30px;
             }
             .card3{
                height: 300px ;
                background-image: url("${cats}");
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
             }
            `;
      div.innerHTML = ` 
         
            
            <section class="section3">
              <div class="conteiner">
                  <div class="card1">
                        <div class="subtitle">
                            Pet Love
                        </div>
                  
                        <div class="parrafo">
                            <p> Perder a tu perro o gato puede ser muy doloroso y el estrés del momento puede llegar a bloquearte, conta con nosotros...
                            </p>             
                        </div>
                  </div>
                  <div class="card2">
                  <div  class="doggi">
                      
                  </div>
                  </div>
                  <div class="title">
                      <p> WE ARE WAITING FOR YOU! 
                      </p>             
                  </div>
                  <div  class="card3">
                      
                  </div>
            </div>
              </div>
            </section>
             
            
            
                `;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
  }
  customElements.define("section-tres", section3);
}
