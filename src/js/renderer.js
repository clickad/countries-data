import  Popup from './popup.js';

export default class Renderer extends Popup{

  constructor(){
    super();
  }

  listData(event, data) {
    let continent = $(event.target).attr('title');
    let sub = $(event.target).data('sub');
    let cont = data;
    this.$content.empty().append(  
      `<h2 class = "popup-title">
        ${continent} Countries
      </h2>
      <div class = "popup-list">
        <table class = "popup-table table">
          <thead>       
            <tr>
              <th>COUNTRY</th>
              <th>CAPITAL</th>
              <th>REGION</th>
              <th>POPULATION</th>
            </tr>
          </thead>
          <tbody>`
    );
    this.$tBody = $('tbody');
    for(let i = 0; i < cont.length; i++ ){
      if(sub === 1){
        if(cont[i].subregion === "Northern America" || 
            cont[i].subregion === "Central America" || 
            cont[i].subregion ==="Caribbean"){
          this.$tBody.append(
            `<tr>
              <td>${cont[i].name}</td>
              <td>${cont[i].capital}</td>
              <td>${cont[i].subregion}</td>
              <td>${cont[i].population}</td>
            </tr>`
          );
        }
      } else if(sub === 2){
        if(cont[i].subregion === "South America"){
          this.$tBody.append(
            `<tr>
              <td>${cont[i].name}</td>
              <td>${cont[i].capital}</td>
              <td>${cont[i].subregion}</td>
              <td>${cont[i].population}</td>
            </tr>`
          );
        }
      } else {
        this.$tBody.append(
            `<tr>
              <td>${cont[i].name}</td>
              <td>${cont[i].capital}</td>
              <td>${cont[i].subregion}</td>
              <td>${cont[i].population}</td>
            </tr>`
        );
      }
    }
    this.$content.append(
          `</tbody>
        </table>
      </div>`);
    this.showPopup();
  }

  showLoader(){
    this.$document.ajaxStart(()=> {
      this.$loader.show();
    });
    this.$document.ajaxComplete(()=> {
      this.$loader.hide();
    });
  }
}