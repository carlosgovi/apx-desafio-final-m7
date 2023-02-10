customElements.define(
  "geo-page",
  class initHomePage extends HTMLElement {
    connectedCallback() {
      this.render();
      this.addListeners();
    }
    render() {
      this.innerHTML = `
      
                <div class="div-container">
                    <div class="title-container">
                        <title-comp>The best locations search engine</title-comp>
                    </div>
                    <div class="map-container">
                    <text-comp titleStyled>Start searching now</text-comp>
                        <div id="geocoder" class="geocoder"></div>
                        <div class="map" id='map'></div>
                    </div>
            
                </div>
                `;

      const style = document.createElement("style");
      style.textContent = `
    
            .div-container {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
            }
            .title-container {
                margin-top: 30px;
            }
            @media (min-width: 375px) {
            	.map {
            		width: 100%;
            		height: 275px;
            		border-radius: 30px;
            	}
            }
            @media (min-width: 1024px) {
            	.map {
            		height: 500px;
            	}
            }
            .map-container {
            	width: 100%;
                height: 100%;
            	margin-top: 40px;
            	padding: 30px;
            	display: flex;
            	flex-direction: column;
            	justify-content: space-evenly;
            	align-items: center;
            	border-radius: 50px;
            	backdrop-filter: blur(5.1px);
            	-webkit-backdrop-filter: blur(5.1px);
            	gap: 25px;
            }
            @media (min-width: 375px) {
            	.map-container {
            		height: 80%;
                    margin-top: 20px;
            		background: rgba(255, 255, 255, 0.1);
            		box-shadow: 0 4px 30px rgba(255, 255, 255, 0.1);
            	}
            }
            @media (min-width: 500px) {
            	.map-container {
            		width: 450px;
            		background: rgba(1, 1, 1, 0.3);
            		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            	}
            }
            @media (min-width: 768px) {
            	.map-container {
            		width: 60%;
            		background: rgba(255, 255, 255, 0.1);
            		box-shadow: 0 4px 30px rgba(255, 255, 255, 0.1);
            	}
            }
            @media (min-width: 1024px) {
            	.map-container {
            		width: 80%;
                    height: 100%;
            		background: rgba(1, 1, 1, 0.3);
            		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            	}
            }
            .geocoder {
            	width: 100%;
            	display: flex;
            	justify-content: space-evenly;
            	align-items: center;
            	border-radius: 25px;
            	gap: 25px;
            }
            .icon {
                width: 70px;
                height: 70px;
            }
        `;

      this.appendChild(style);
    }

    addListeners() {}
  }
);
