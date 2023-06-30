//ACCORDION
window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-RTNBMB59KF');

function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('fa-plus fa-minus');
}
$('.panel-group').on('hidden.bs.collapse', toggleIcon);
$('.panel-group').on('shown.bs.collapse', toggleIcon);

//LISTADO
$('#grid').click(function() {
    $(this).addClass("active");
    $("#list").removeClass("active");
    $("ul.prodlist-grid").fadeOut(300, function() {
        $(this).addClass("grid").removeClass("list").fadeIn(300)
    });
});

$('#list').click(function() {
    $(this).addClass("active");
    $("#grid").removeClass("active");
    $("ul.prodlist-grid").fadeOut(300, function() {
        $(this).removeClass("grid").addClass("list").fadeIn(300)
    });
});
/*OWL CAROUSEL*/
$('.services-owl1').owlCarousel({
    loop:true,
    nav:true,
    margin:0,
    responsiveClass:true,
    items:1,
    autoplay:true,
    autoplayTimeout:10000,
    autoplayHoverPause:true,
});

$('.produc').owlCarousel({
    loop:true,
    margin:50,
    nav:true,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            margin:0
        },
        401:{
            items:2
        },
        991:{
            items:3
        },
        1200:{
            items:4
        }
    },
    autoplay:false,
    autoplayTimeout:3000,
    autoplayHoverPause:false,
});
$('.flowsss').owlCarousel({
    loop:true,
    margin:50,
    nav:false,
    dots:true,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            margin:0
        },
        710:{
            items:2
        },
        1000:{
            items:3
        }
    },
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:false,
});
$('.clients1').owlCarousel({
    loop:true,
    margin:50,
    nav:false,
    dots:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            margin:0
        },
        400:{
            items:2
        },
        710:{
            items:3
        },
        1000:{
            items:4
        }
    },
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:false,
});
/*$('.center').slick({
  centerMode: true,
  centerPadding: '60px',
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});*/

$('.testimoniosss').owlCarousel({
    loop:true,
    nav:false,
    margin:0,
    responsiveClass:true,
    items:1,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
});

/* MENU */
$('#main-over1').click(function() {
    $(this).toggleClass('activemain');
    $(this).toggleClass('is-active');
    $('#navhead1').toggleClass('openme');
    $('#overlay').toggleClass('open');
});
/* MENU FLOAT */
var altura = ($('.navigation-allgs').offset() || { "top": NaN }).top;

$(window).on('scroll', function () {
    if ($(window).scrollTop() > altura) {
        $('.eonav-cntfluid').addClass('menu-fixed');
    } else {
        $('.eonav-cntfluid').removeClass('menu-fixed');
    }
});

/* anclaje */
var mediaquery = window.matchMedia("(max-width: 992px)");
if (mediaquery.matches) {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({scrollTop: ($($anchor.attr('href')).offset().top - 61)}, 1250, 'easeInOutExpo');
        event.preventDefault();
    });
} else {
    $('a.page-scroll').bind('click', function(event) {            
        var $anchor = $(this);
        $('html, body').stop().animate({scrollTop: ($($anchor.attr('href')).offset().top - 80)}, 1250, 'easeInOutExpo');
        event.preventDefault();
    });
};

/*GOOGLE MAPS*/
$('.maps').click(function () {
    $('.maps iframe').css("pointer-events", "auto");
});

$(".maps").mouseleave(function () {
    $('.maps iframe').css("pointer-events", "none");
});


/*SLIDER MATERIALIZE*/
$(document).ready(function(){
      $('.slider').slider({
        full_width: true,
        interval: 4000,
        indicators: true,
        transition: 1000,
        height: 450
    });

    $('.slider').slider('next');
    $('.slider').slider('prev');
});

/* --FACEBOOK -- */
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
        return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v2.5";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
//TWITTER
!function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
    if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + '://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);
    }
}(document, 'script', 'twitter-wjs');


var wow = new WOW(
  {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       30,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         true,       // act on asynchronously loaded content (default is true)
    callback:     function(box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null // optional scroll container selector, otherwise use window
  }
);
wow.init();