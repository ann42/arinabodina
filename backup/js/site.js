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
      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();
        
      var mapOptions = {
        center: new google.maps.LatLng(55.802898, 37.5110276),
        zoom: 16,
        scrollwheel: false
      };

      var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
        
      directionsDisplay.setMap(map);
        
      var directionRequest = {
          origin: new google.maps.LatLng(55.8042202,37.5161527),
          destination: new google.maps.LatLng(55.8024409,37.5071098),
          travelMode: google.maps.TravelMode.WALKING,
          unitSystem: google.maps.UnitSystem.METRIC
      };
        
      directionsService.route(directionRequest, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        };
      });

    }

    google.maps.event.addDomListener(window, 'load', initialize);


    $('.main-nav li a').click(function(){
        $('.main-nav li a').removeClass("active");
        var runner = $(this).parent().parent().prev('.runner');
        var chart = $(this).parents('.nav-wrap');
        runner.animate({
            width: $(this).outerWidth(),
            left: $(this).position().left
        }, 300);
        $(this).addClass("active");
    });

    // Example with multiple objects
    $('.btn-all').magnificPopup({
        items: 
          {
            src: '#albums-popup' // CSS selector of an element on page that should be used as a popup
            
          },
          type: 'inline'
      });

});

