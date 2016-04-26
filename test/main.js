function ScrollEventsManager() {
  this.progressBar = false;

  this.init = function () {
    $('.ui-progress').css('width', '7%');

    var navOffeset = $(".navigation").offset().top;
    var progressBarsOffset = $('#whyChooseUs').offset().top;

    $(window).scroll(function () {
      var scrollpos = $(window).scrollTop();
      if (scrollpos >= navOffeset) {
        $(".navigation").addClass("fixed");
        $('#toTop').fadeIn();

        if (scrollpos >= progressBarsOffset) {
          ScrollEvents.progressBarInit();
        }
      } else {
        $(".navigation").removeClass("fixed");
        $('#toTop').fadeOut()
      }
    });

    ScrollEvents.introduction();
  }

  this.progressBarInit = function () {
    if (!ScrollEvents.progressBar) {
      ScrollEvents.progressBar = true;

      $('#progress_bar .ui-progress').animateProgress(30, function () {
        $(this).animateProgress(40, function () {
          $(this).animateProgress(50, function () {});
        });
      });

      $('#progress_bar2 .ui-progress').animateProgress(20, function () {
        $(this).animateProgress(30, function () {
          $(this).animateProgress(35, function () {});
        });
      });
    }
  }

  this.introduction = function () {
    $('.banner-info').css('opacity', 0);

    $('.banner').waitForImages(function () {
      setTimeout(function () {
        $('.banner-info').animate({
          opacity: 1
        }), 2500;
      }, 800);
    });
  }
}
$.waitForImages.hasImgProperties = ['backgroundImage'];

ScrollEvents = new ScrollEventsManager();

$(document).ready(function ($) {
  $(".scroll").click(function (event) {
    event.preventDefault();
    $('html,body').animate({
      scrollTop: $(this.hash).offset().top
    }, 1000, 'easeInOutExpo');
  });

  ScrollEvents.init();
});

$(function () {
  var filterList = {
    init: function () {
      // MixItUp plugin
      // http://mixitup.io
      $('#portfoliolist').mixitup({
        targetSelector: '.portfolio',
        filterSelector: '.filter',
        effects: ['fade'],
        easing: 'snap',
        // call the hover effect
        onMixEnd: filterList.hoverEffect()
      });
    },
    hoverEffect: function () {
      // Simple parallax effect
      $('#portfoliolist .portfolio').hover(
        function () {
          $(this).find('.label').stop().animate({
            bottom: 0
          }, 200, 'easeOutQuad');
          $(this).find('img').stop().animate({
            top: -30
          }, 500, 'easeOutQuad');
        },
        function () {
          $(this).find('.label').stop().animate({
            bottom: -40
          }, 200, 'easeInQuad');
          $(this).find('img').stop().animate({
            top: 0
          }, 300, 'easeOutQuad');
        }
      );
    }
  };
  // Run the show!
  filterList.init();
});

(function () {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();
