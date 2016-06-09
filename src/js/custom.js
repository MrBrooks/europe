/**************************************/
/* Custom JavaScript files supervisor */
/**************************************/

function Sizes(){
  var self = this;

  var map_container = $(".mbr-block__contact>.row");
  var map = $("#map");
  var timer;

  self.setSizes = function(){
    if( map.length > 0){
      map.height(map_container.height());
    }
  };

  self.onResize = function(){
    $(window).on('resize', function(){
      clearInterval(timer);
      timer = setTimeout(function(){
        self.setSizes();
      },100);
    });
  };

  self.init = function(){
    self.setSizes();
    self.onResize();
  };

  self.init();
}

function Tabs(){
  var tabs = $(".mbr-tabs li");
  var mobile_btns = $(".mobile-tab-btn");
  var temp = '';
  var current = $("#tab-1");
  if(window.innerWidth <= 480){
    current.removeClass('active');
  }
  tabs.on('click', function(){
    temp = $(this).attr("data-id");
    $(this).addClass("active").siblings().removeClass("active");
    current.removeClass("active");
    current = $("#"+temp).addClass("active");
    // $("#"+temp).addClass("active").siblings().removeClass("active");
  });
  mobile_btns.on('click',function(){
    $(this).toggleClass('active').siblings().toggleClass('active');
  });
}

function Popup(){
  var self = this,
      body = $('html, body'),
      popups = [
      {
        popup : $("#mbr-popup-map"),
        trigger : $("#howto-map"),
        close : $("#mbr-popup__close")
      },
      {
        popup : $("#mbr-popup-book"),
        trigger : $("#mbr-popup-book-open,#mbr-popup-book-open-footer"),
        close : $("#mbr-popup__close-book")
      }
      ];
      // trigger = $("#howto-map"),
      // close_btn = $("#mbr-popup__close");

  function show(e){
    popups[e.data.index].popup.show();
    body.css('overflow', 'hidden');
  }

  function hide(e){
    popups[e.data.index].popup.hide();
    body.css('overflow', 'auto');
  }

  self.init = function(){
    for (var i = 0; i < popups.length; i++){
      var t = i;
      popups[t].trigger.on("click",{index : t},show);
      popups[t].close.on("click",{index : t},hide);
      popups[t].popup.on("click",{index : t},function(e){
        if(e.target == this){
          hide(e);
        }
      });
    }
    // trigger.on("click",show);
    // close_btn.on("click",hide);
    // popups.on("click",function(e){
    //   if(e.target == this){
    //     hide();
    //   }
    // });
  };

  self.init();
}

function PopupSlider(){
  var self = this,
      body = $('html, body'),
      popup = $("#mbr-popup-slider"),
      trigger = $("#mbr-certificate-slider img"),
      close = $("#mbr-popup-slider .mbr-popup__close"),
      slider = $("#mbr-popup-slider-certificate");
      // popups = [
      // {
      //   popup : $("#mbr-popup-map"),
      //   trigger : $("#mbr-certificate-slider img"),
      //   close : $("#mbr-popup__close"),
      //   slider : $("#mbr-popup-slider-certificate")
      // }
      // ];
      // trigger = $("#howto-map"),
      // close_btn = $("#mbr-popup__close");

  function show(e){
    popup.show();
    body.css('overflow', 'hidden');
  }

  function hide(e){
    popup.hide();
    body.css('overflow', 'auto');
  }

  self.init = function(){
    // var next = slider.find(".owl-next"),
    //     prev = slider.find(".owl-prev");

    slider = slider.owlCarousel({
      items:1,
      loop:true,
      nav: true,
      dots: false,
      navText: ["<div class='svg-sprite--arrow-right-bronse'></div>","<div class='svg-sprite--arrow-left-bronse'></div>"]
    });

    trigger.on("click",function(){
      var index = $(this).attr("data-index"); 
      slider.trigger("to.owl.carousel",[index,10]);
      show();
    });
    close.on("click",hide);
    popup.on("click",function(e){
      if(e.target == this){
        hide(e);
      }
    });
    // trigger.on("click",show);
    // close_btn.on("click",hide);
    // popups.on("click",function(e){
    //   if(e.target == this){
    //     hide();
    //   }
    // });
  };

  self.init();
}

function MobileMenu(){
  var has_dropdown = $(".has-dropdown");
  var btn = $("#mbr-mobile-menu-btn");
  var menu = $("#mbr-menu");
  var self = this;

  self.init = function(){
    btn.on('click',function(){
      menu.slideToggle(100);
    });
    has_dropdown.on('click', function(){
      $(this).toggleClass('active').find(".dropdown").slideToggle(100);
    });
  };

  self.init();
}


$(document).ready(function() {

    /* Custom */

 /*    //= ./common/material-init.js */
 /*    //= ./common/google-analytics.js */

  var mobile = false;
  if(window.innerWidth <= 480){
    mobile = true;
  }
 
  $("#mbr-main-slider").owlCarousel({
    items:1,
    loop:true,
    nav: true,
    dots: true,
    navText: ["<div class='svg-sprite--arrow-right'></div>","<div class='svg-sprite--arrow-left'></div>"]
  });
  $("#mbr-about-slider").owlCarousel({
    items:1,
    loop:true,
    nav: true,
    dots: false,
    navText: ["<div class='svg-sprite--arrow-right'></div>","<div class='svg-sprite--arrow-left'></div>"]
  });
  $("#mbr-client-clider").owlCarousel({
    items:1,
    loop:true,
    nav: true,
    dots: false,
    navText: ['<div class="svg-sprite--arrow-right-white"></div><span>Предыдущий</span>','<span>Следующий</span><div class="svg-sprite--arrow-left-white"></div>']
  });
  $("#mbr-certificate-slider").owlCarousel({
    items:4,
    loop:true,
    nav: true,
    dots: false,
    margin: 10,
    navText: ["<div class='svg-sprite--arrow-right'></div>","<div class='svg-sprite--arrow-left'></div>"],
    responsive : {
      0 : {
        items: 1
      },
      481 : {
        items: 4
      }
    }
  });
  if (mobile){
    $("#mbr-mobile-docs-slider").owlCarousel({
      items:1.25,
      loop:true,
      nav: false,
      dots: false,
      center: true
    });
  }

  var size_control = new Sizes();
  
  if($(".mbr-tabs").length > 0){
    var tabs = new Tabs();
  }
  var popup = new Popup();
  var mobile_menu = new MobileMenu();
  var popup_slider = new PopupSlider();


});

// GOOGLE MAP INIT

function initMap() {
  var customMapType = new google.maps.StyledMapType([
    {
      "stylers": [
        { "saturation": -100 }
      ]
    }
  ], {
      name: 'Custom Style'
  });
  var customMapTypeId = 'custom_style';

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: {lat: 59.8663195, lng: 30.3190016},
    disableDefaultUI: true,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
    }
  });
  // popup-map
  // var popup_map = new google.maps.Map(document.getElementById('popup-map'), {
  //   zoom: 17,
  //   center: {lat: 59.8663195, lng: 30.3190016},
  //   disableDefaultUI: true,
  //   mapTypeControlOptions: {
  //     mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
  //   }
  // });

  map.mapTypes.set(customMapTypeId, customMapType);
  map.setMapTypeId(customMapTypeId);
  // popup_map.mapTypes.set(customMapTypeId, customMapType);
  // popup_map.setMapTypeId(customMapTypeId);

  setMarkers(map);
  // setMarkers(popup_map);
}

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var markers = [
  ['Европа', 59.866710, 30.318618, 1]
];

function setMarkers(map) {
  // Adds markers to the map.

  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.

  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
  var image = {
    url: 'img/images/marker_europe.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(51, 83),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(26, 83)
  };
  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  // var shape = {
  //   coords: [1, 1, 1, 20, 18, 20, 18, 1],
  //   type: 'poly'
  // };
  for (var i = 0; i < markers.length; i++) {
    var point = markers[i];
    var marker = new google.maps.Marker({
      position: {lat: point[1], lng: point[2]},
      map: map,
      icon: image,
      // shape: shape,
      title: point[0],
      zIndex: point[3]
    });
  }
}

// map key api
// AIzaSyAeSJRygFXK33WKoR0x6XH-JDbaOXsxfyk
