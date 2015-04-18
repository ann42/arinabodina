$(document).ready(function(){
    $('.button-collapse').sideNav({closeOnClick: true});

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

      function is_touch_device() {
       return (('ontouchstart' in window)
            || (navigator.MaxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0));
      }

      var mapOptions = {
        zoom: 16,
        scrollwheel: false,
        draggable: is_touch_device() ? false : true
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

          if(document.body.offsetWidth >= 600){
            google.maps.event.addListenerOnce(map, 'idle', function(){
              var bounds = map.getBounds();
              var widthDeg = Math.abs(bounds.getSouthWest().lng() - bounds.getNorthEast().lng())
              var center = map.getCenter();
              map.setCenter({lat: center.lat(), lng: center.lng() - widthDeg/4});
            });
          }

        };
      });
    }

    google.maps.event.addDomListener(window, 'load', initialize);

    var allowRunnerOnScroll = true;
    $(".scroll-btn").click(function(event) {
        var currentHref = $(this).attr("href");
        allowRunnerOnScroll = false;
        animateRunnerToFirstMenuItem(this);
        var section = $(currentHref);
        TweenMax.to(window, 1.5, {
          scrollTo: {
            y: section.position().top
          },
          onComplete:function(){
              allowRunnerOnScroll = true;
              window.location.hash = currentHref;
          },
          ease:Quart.easeInOut
        });
        event.preventDefault();
    });

    function animateRunnerToFirstMenuItem(menuLink){
      var runner = $(menuLink).parent().parent().prev('.runner');
      var chart = $(menuLink).parents('.nav-wrap');
      if (chart.length == 0 || runner.length == 0 || !menuLink){
        return;
      }
      var duration = Math.abs($(menuLink).position().left - runner.position().left) * 1.3;

      runner.stop().animate({
          width: $(menuLink).outerWidth(),
          left: $(menuLink).position().left
      }, duration);
    }

    var runnerTimer = null;
    $(window).scroll(function(){
      var menuLinks = $('.main-nav li a');

      var sectionOffset = 20;

      menuLinks.each(function(index, menuLink){
        var sectionSelector = $(menuLink).attr('href');
        var section = $(sectionSelector);

        //Верхняя граница блока выше верхней границы экрана И
        // Нижняя граница блока ниже верхней границы экрана
        if (section.offset().top - sectionOffset < $(window).scrollTop() && 
            section.offset().top - sectionOffset + section.height() > $(window).scrollTop() ) {
            clearTimeout(runnerTimer);
            if(allowRunnerOnScroll){
              runnerTimer = setTimeout(function(){
                  animateRunnerToFirstMenuItem(menuLink);
              }, 100);
            }
        }
      });

    });

    function initFlexSlider(jqueryObject){
      jqueryObject.flexslider({
        animation: "slide",
        directionNav: false
      }).flexsliderManualDirectionControls({
        previousElementSelector: ".btn-prev",
        nextElementSelector: ".btn-next",
        disabledStateClassName: "disabled"
      });
    }

    //Включает слайдер на главной
    initFlexSlider($('.flexslider'));

    animateRunnerToFirstMenuItem($('.main-nav li a').first());
});

