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

    function animateRunnerToFirstMenuItem(menuLink){
      var runner = $(menuLink).parent().parent().prev('.runner');
      var chart = $(menuLink).parents('.nav-wrap');

      var duration = Math.abs($(menuLink).position().left - runner.position().left) * 1.3;

      runner.stop().animate({
          width: $(menuLink).outerWidth(),
          left: $(menuLink).position().left
      }, duration);
    }

    var runnerTimer = null;

    $('.main-nav li a').click(function(){
      animateRunnerToFirstMenuItem(this);
    });

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
            runnerTimer = setTimeout(function(){
                animateRunnerToFirstMenuItem(menuLink);
            }, 100);
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

    function initPhotoPopupContent(content){
      // Ajax content is loaded and appended to DOM
      initFlexSlider($(content).find('.flexslider'));
      $(content).find('.album-link').click(function(e){
        e.preventDefault();
        $('.mfp-content').load($(this).attr('href'), function(){
          initPhotoPopupContent(this.firstChild);
        });
      });
    }

    // Example with multiple objects
    $('.btn-all, .album-link').magnificPopup({
          type: 'ajax',
          callbacks: {
            ajaxContentAdded: function() {
              initPhotoPopupContent(this.content);
            }
          }
      });


    animateRunnerToFirstMenuItem($('.main-nav li a').first());
});

