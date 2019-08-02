export default class Data {
  getData(event) {
    let continent = $(event.target).attr('title');
    return $.getJSON('https://restcountries.eu/rest/v2/region/' + continent);
  }
}