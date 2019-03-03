(()=>{
  'use strict';
  let app = {
    init: function(){
      this.$window = $(window);
      this.$document = $(document);
      this.$imgUsemap = $('img[usemap]');
      this.$area = $('.area');
      this.$loader = $('#loader');
      this.$overlay = $('#overlay');
      this.$close = $('#close');
      this.$content = $('.popup-content');
      this.$infoWrapper = $('.popup-wrapper');
      this.$imgUsemap.show();
      this.$imgUsemap.maphilight();
      this.$imgUsemap.rwdImageMaps();
      this.$area.on('click', this.listData.bind(this));
      this.$window.on('resize hover', this.onResize.bind(this));
      this.$overlay.on('click', this.hidePopup.bind(this));
      this.$close.on('click', this.hidePopup.bind(this));
    },

    listData: function(event){
      this.showLoader();
      let self = this;
      let continent = $(event.target).attr('title');
      let sub = $(event.target).data('sub');
      $.getJSON('https://restcountries.eu/rest/v2/region/' + continent + '', (data)=> { 
        let cont = data;
        self.$content.empty().append(  
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
        self.$tBody = $('tbody');
        for(let i = 0; i < cont.length; i++ ){
          if(sub === 1){
            if(cont[i].subregion === "Northern America" || 
               cont[i].subregion === "Central America" || 
               cont[i].subregion ==="Caribbean"){
              self.$tBody.append(
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
              self.$tBody.append(
                `<tr>
                  <td>${cont[i].name}</td>
                  <td>${cont[i].capital}</td>
                  <td>${cont[i].subregion}</td>
                  <td>${cont[i].population}</td>
                </tr>`
              );
            }
          } else {
            self.$tBody.append(
                `<tr>
                  <td>${cont[i].name}</td>
                  <td>${cont[i].capital}</td>
                  <td>${cont[i].subregion}</td>
                  <td>${cont[i].population}</td>
                </tr>`
            );
          }
        }
        self.$content.append(
              `</tbody>
            </table>
          </div>`);
      });
      this.showPopup();
    },

    showPopup: function (){ 
      this.$overlay.fadeIn('slow');
      this.$infoWrapper.fadeIn('slow');
      this.$content.animate({ scrollTop: 0 });
    },

    hidePopup: function(){
      this.$overlay.fadeOut('slow');
      this.$infoWrapper.fadeOut('slow');
    },

    showLoader: function(){
      let self = this;
      this.$document.ajaxStart(()=> {
        self.$loader.show();
      });
      this.$document.ajaxComplete(()=> {
        self.$loader.hide();
      });
    },

    onResize: function(){
      this.$imgUsemap.maphilight();
    }
  };

  $(window).on('load',()=> {
    app.init();
  });
})();