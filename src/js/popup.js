import Main from './main.js';

export default class Popup extends Main{

  constructor(){
    super();
  }

  showPopup() { 
    this.$overlay.fadeIn('slow');
    this.$infoWrapper.fadeIn('slow');
    this.$content.animate({ scrollTop: 0 });
  }

  hidePopup() {
    this.$overlay.fadeOut('slow');
    this.$infoWrapper.fadeOut('slow');
  }
}