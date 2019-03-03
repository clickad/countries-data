"use strict";

(function () {
  'use strict';

  var app = {
    init: function init() {
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
    listData: function listData(event) {
      this.showLoader();
      var self = this;
      var continent = $(event.target).attr('title');
      var sub = $(event.target).data('sub');
      $.getJSON('https://restcountries.eu/rest/v2/region/' + continent + '', function (data) {
        var cont = data;
        self.$content.empty().append("<h2 class = \"popup-title\">\n            ".concat(continent, " Countries\n          </h2>\n          <div class = \"popup-list\">\n            <table class = \"popup-table table\">\n              <thead>       \n                <tr>\n                  <th>COUNTRY</th>\n                  <th>CAPITAL</th>\n                  <th>REGION</th>\n                  <th>POPULATION</th>\n                </tr>\n              </thead>\n              <tbody>"));
        self.$tBody = $('tbody');

        for (var i = 0; i < cont.length; i++) {
          if (sub === 1) {
            if (cont[i].subregion === "Northern America" || cont[i].subregion === "Central America" || cont[i].subregion === "Caribbean") {
              self.$tBody.append("<tr>\n                  <td>".concat(cont[i].name, "</td>\n                  <td>").concat(cont[i].capital, "</td>\n                  <td>").concat(cont[i].subregion, "</td>\n                  <td>").concat(cont[i].population, "</td>\n                </tr>"));
            }
          } else if (sub === 2) {
            if (cont[i].subregion === "South America") {
              self.$tBody.append("<tr>\n                  <td>".concat(cont[i].name, "</td>\n                  <td>").concat(cont[i].capital, "</td>\n                  <td>").concat(cont[i].subregion, "</td>\n                  <td>").concat(cont[i].population, "</td>\n                </tr>"));
            }
          } else {
            self.$tBody.append("<tr>\n                  <td>".concat(cont[i].name, "</td>\n                  <td>").concat(cont[i].capital, "</td>\n                  <td>").concat(cont[i].subregion, "</td>\n                  <td>").concat(cont[i].population, "</td>\n                </tr>"));
          }
        }

        self.$content.append("</tbody>\n            </table>\n          </div>");
      });
      this.showPopup();
    },
    showPopup: function showPopup() {
      this.$overlay.fadeIn('slow');
      this.$infoWrapper.fadeIn('slow');
      this.$content.animate({
        scrollTop: 0
      });
    },
    hidePopup: function hidePopup() {
      this.$overlay.fadeOut('slow');
      this.$infoWrapper.fadeOut('slow');
    },
    showLoader: function showLoader() {
      var self = this;
      this.$document.ajaxStart(function () {
        self.$loader.show();
      });
      this.$document.ajaxComplete(function () {
        self.$loader.hide();
      });
    },
    onResize: function onResize() {
      this.$imgUsemap.maphilight();
    }
  };
  $(window).on('load', function () {
    app.init();
  });
})();