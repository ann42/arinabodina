$(document).ready(function(){
    $('.button-collapse').sideNav();

    $('ul.tabs').tabs();

    //$('.week-day-mobile .tab a').click(function(){
      //var cellIndex = Number($(this).attr('href').substring(1)) + 1;
      //var cellsSelector = '.schedule-table td:nth-child('+ cellIndex + ')';
      //$('.schedule-table td:not(:first-child)').hide();
      //$(cellsSelector).show();
    //})

  function initialize() {
    var mapOptions = {
      zoom: 14,
      scrollwheel: false
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }
});