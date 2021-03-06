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
  var mobile_btns_top = [];
  var mobile_btns_h = 96;
  var temp = '';
  var current = $("#tab-1");
  var contents = $(".mbr-tabs .tab-content");
  var temp_scroll = 0;
  var curr_btn_origin = 0;
  var is_active = false;

  if(window.innerWidth <= 480){
    current.removeClass('active');
    $(window).on('scroll',function(){
      updateBtnTop();
      mobile_btns.each(function(index){
        // console.log(index);
        if($(this).hasClass('active')){
          // if(stickyCondition(index)) {
          //   $(this).addClass('sticky');
          // } else {
          //   $(this).removeClass('sticky');
          // }
          switch(stickyCondition(index)){
            case 0: 
              $(this).addClass('sticky').removeClass('bottom');
            break;
            case 1:
              $(this).addClass('sticky bottom');
            break;
            case 2:
              $(this).removeClass('sticky');
            break;
            case 3: 
            break;
          }
        }
      });
    });
  }

  tabs.on('click', function(){
    temp = $(this).attr("data-id");
    $(this).addClass("active").siblings().removeClass("active");
    current.removeClass("active");
    current = $("#"+temp).addClass("active");
    // $("#"+temp).addClass("active").siblings().removeClass("active");
  });

  mobile_btns.on('click',function(){
    is_active = $(this).hasClass('active');
    mobile_btns.removeClass("active sticky bottom");
    contents.removeClass("active");
    if(!is_active){
      $(this).addClass('active').siblings().addClass('active');
    }
    // console.log($(this).offset().top);
    $(window).scrollTop(curr_btn_origin = $(this).offset().top);
  });

  function updateBtnTop(){
    mobile_btns_top = [];
    mobile_btns.each(function(){
      mobile_btns_top.push($(this).offset().top);
    });
  }

  function stickyCondition(index){
    temp_scroll = $(window).scrollTop();
    if(index < mobile_btns_top.length - 1){
      if((temp_scroll >= curr_btn_origin) && (temp_scroll < mobile_btns_top[index+1] - mobile_btns_h - 7)){
        return 0;
      }
      if(temp_scroll >= mobile_btns_top[index+1] - mobile_btns_h - 7){
        return 1;
      }
      return 2;
    } else{
      if((temp_scroll >= curr_btn_origin)){
        return 0;
      }
      if(temp_scroll >= mobile_btns_top[index+1] - mobile_btns_h - 7){
        return 1;
      }
      return 2;
    }
    return 0;
  }

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
        trigger : $("#mbr-popup-book-open,#mbr-popup-book-open-footer, #mbr-book-from-game"),
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

function Game(){
  var start_btn = $("#start-game"),
      skip_btn = $("#skip-game"),
      game = $("#mbr-game"),
      wanttoplay = $("#want-to-play");

  var question = game.find("#question-text"),
      image = game.find("#question-image"),
      answer_btns = game.find(".game-answer"),
      next = game.find("#game-next"),
      content = game.find("#content"),
      result = game.find("#result"),
      again_btn = game.find("#again-btn"),
      // book = game.find("#mbr-book-from-game"),
      progress = game.find("#right-count"),
      mark = game.find("#mark"),
      total = game.find("#total-count");


  var current_step = 0,
      answered = false,
      right_answers = 0,
      steps = 0;

  var questions = [
    {
      image: "http://placehold.it/50x50",
      question: "<p><b>«По мнению опытных дам и московских зубных врачей, зубная боль бывает трех сортов: ревматическая, нервная и костоедная; но взгляните вы на физиономию несчастного Дыбкина, и вам ясно станет, что его боль не подходит ни к одному из этих сортов».</b></p><p>Автор этого отрывка – врач и драматург? Кто это?</p>",
      answers: ['А.П. Чехов','А. Дюма','Ф. Кафка','В. В. Маяковский'],
      right: 1
    },
    {
      image: "http://placehold.it/100x100/ac9933",
      question: "<p><b>Ортодонтические несъёмные конструкции, для коррекции положения зубов человека при нарушениях прикуса, неровности зубного ряда – это ...?</b></p>",
      answers: ['Брикеты','Байкеры','Брокеры','Брекеты'],
      right: 4
    },
    {
      image: "http://placehold.it/100x100/ac9933",
      question: "<p><b>Как сохранять свои зубы в целости годами?</b></p>",
      answers: ['Чистить дважды в день','Посещать стоматолога','Не лезть в чужие дела','Все варианты – правильные'],
      right: 4
    },
    {
      image: "http://placehold.it/100x100/ac9933",
      question: "<p><b>Как называются первые зубы человека?</b></p>",
      answers: ['Кефирные','Сметанные','Творожные','Молочные'],
      right: 4
    },
    {
      image: "http://placehold.it/100x100/ac9933",
      question: "<p><b>Какой вид спорта самый опасный для зубов?</b></p>",
      answers: ['Футбол','Кёрлинг','Хоккей','Теннис'],
      right: 3
    }
  ];
  // 0, 1, ... , 5 right answers
  var marks = ["Ты в школе учился вообще?","Very baaaaad","Not so bad","Жить можно","Good","Excelent, можешь идти на работу в Google"];

  function UpdateQuestion(){
    if(answered || current_step === 0){
      if(current_step < steps){
        image.attr('src',questions[current_step].image);
        question.html(questions[current_step].question);
        answer_btns.removeClass("wrong correct").each(function(i){
          $(this).text(questions[current_step].answers[i]);
        });
      } else{
        // Show results
        showResult();
      }
      current_step++;
      answered = false;
    }
    
  }

  function showResult(){
    content.hide();
    next.hide();
    progress.text(right_answers);
    total.text(steps);
    mark.text(marks[right_answers]);
    if(steps === right_answers){
      again_btn.find('span').text('Еще раз');
    } else{
      again_btn.find('span').text('Попробовать снова');
    }
    result.show();
  }

  function check(){
    if(!answered){
      answered = true;
      var index = parseInt($(this).attr('data-index'));
      var right = questions[current_step-1].right;
      if(index === right){
        //right answer!
        $(this).addClass("correct");
        right_answers++;
      } else{
        //wrong answer!
        $(this).addClass("wrong");
        $(answer_btns[right-1]).addClass("correct");
      }
    }
  }

  function start(){
    wanttoplay.hide();
    game.show();
    UpdateQuestion();
  }

  function restart(){
    current_step = 0;
    answered = false;
    right_answers = 0;
    content.show();
    next.show();
    result.hide();
    UpdateQuestion();
  }

  function init(){

    steps = questions.length;
    events();

  }

  function events(){
    answer_btns.on('click', check);
    next.on('click', UpdateQuestion);
    start_btn.on('click', start);
    again_btn.on('click',restart);
  }

  init();
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
    $("#mbr-book-open-mobile").on("click",function(){
      if( $(this).hasClass('active')){
        $(this).removeClass("active").text("Записаться на прием");
      } else {
        $(this).addClass("active").text("Отмена");
      }
      $("#mbr-book-mobile").slideToggle(200);
    });
  }

  var size_control = new Sizes();
  
  if($(".mbr-tabs").length > 0){
    var tabs = new Tabs();
  }
  var popup = new Popup();
  var mobile_menu = new MobileMenu();
  if (window.innerWidth > 481){
    var popup_slider = new PopupSlider();
  } else{
    $("#mbr-certificate-slider img[data-mobile-url]").each(function(){
      var url = $(this).attr('data-mobile-url');
      $(this).wrap("<a target='_blank' href='"+url+"'></a>");
    });
  }

  var game = new Game();


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
