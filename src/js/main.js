export default class Main {
    constructor(){
      this.$window = $(window);
      this.$document = $(document);
      this.$imgUsemap = $('img[usemap]');
      this.$area = $('.area');
      this.$loader = $('#loader');
      this.$overlay = $('#overlay');
      this.$close = $('#close');
      this.$content = $('.popup-content');
      this.$infoWrapper = $('.popup-wrapper');
    }

    onResize(){
      this.$imgUsemap.maphilight();
    }
}