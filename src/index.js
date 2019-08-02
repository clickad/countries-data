import _ from 'lodash';
import './css/style.css';
import Main from './js/main.js';
import Data from './js/data.js';
import Popup from './js/popup.js';
import Renderer from './js/renderer.js';

$(window).on("load", ()=> {

  let main = new Main();
  let data = new Data();
  let popup = new Popup();
  let renderer = new Renderer();

  renderer.showLoader();
  main.$imgUsemap.show();
  main.$imgUsemap.maphilight();
  main.$imgUsemap.rwdImageMaps();

  main.$area.on('click', (event)=>{
    $.when(data.getData(event)).then((data)=> {
      renderer.listData(event, data);
    })
  });

  main.$window.on('resize hover', ()=>main.onResize());
  main.$overlay.on('click', ()=>popup.hidePopup());
  main.$close.on('click', ()=>popup.hidePopup());
});