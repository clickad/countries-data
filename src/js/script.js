$(window).on('load',function(){

  $('img[usemap]').maphilight();	
  $('img[usemap]').rwdImageMaps();

  //show countries data
  $('.area').on('click',function(){
   var continent = $(this).attr('title');
   var sub = $(this).data('sub');
   getData(continent, sub);
  });

  // function to get countries data
  function getData(continent, sub){
   $('.loader, #overlay').show();
   $.getJSON('https://restcountries.eu/rest/v2/region/' + continent + '', function(data){ 
    var cont = data;
    setTimeout(function(){$('.loader').hide();},1000);
      $('.continent_info').empty().append('<h2 class = "continent_title">' + continent + ' Countries</h2><div class = "list_wrapper"><table class = "info_list table"><thead><tr><th>COUNTRY</th><th>CAPITAL</th><th>REGION</th><th>POPULATION</th></tr></thead><tbody>');
     
      for(var i = 0; i < cont.length; i++ ){
        if(sub == 1){
          if(cont[i].subregion == "Northern America" || cont[i].subregion == "Central America" || cont[i].subregion == "Caribbean"){
            $('tbody').append('<tr><td>'+cont[i].name+'</td><td>'+ cont[i].capital +'</td><td>'+ cont[i].subregion +'</td><td>' + cont[i].population + '</td></tr>');
          }
        } else if(sub == 2){
          if(cont[i].subregion == "South America"){
            $('tbody').append('<tr><td>'+cont[i].name+'</td><td>'+ cont[i].capital +'</td><td>'+ cont[i].subregion +'</td><td>' + cont[i].population + '</td></tr>');
          }
        } else {
            $('tbody').append('<tr><td>'+cont[i].name+'</td><td>'+ cont[i].capital +'</td><td>'+ cont[i].subregion +'</td><td>' + cont[i].population + '</td></tr>');
        }
      }
    $('.continent_info').append('</tbody></table></div>');
    setTimeout(function(){
      $('.info_wrapper, #overlay').fadeIn('slow');
      $('.continent_info').animate({ scrollTop: 0 });
    },1000);
   })
  }

  //On each resize or hover refresh maphighlight so it is responsive
  $(window).on('resize hover', function(e){
    $('img[usemap]').maphilight();   
  });

  //Close button on info popup
  $('span.close__btn, #overlay').on('click',function(e){
     $('.info_wrapper, #overlay').fadeOut('slow');
  });

});
