var jQuery = require('jquery');
(function($){

  $.fn.twentytwenty = function(options) {
    var options = $.extend({default_offset_pct: 0.5, orientation: 'horizontal'}, options);
    return this.each(function() {

      var sliderPct = options.default_offset_pct;
      var container = $(this);
      var sliderOrientation = options.orientation;
      var beforeDirection = (sliderOrientation === 'vertical') ? 'down' : 'left';
      var afterDirection = (sliderOrientation === 'vertical') ? 'up' : 'right';
      
      if ( $(".twentytwenty-wrapper").length <= 0 ) {
        container.wrap("<div class='twentytwenty-wrapper twentytwenty-" + sliderOrientation + "'></div>");
      }
      if ( $(".twentytwenty-overlay").length <= 0 ) {
        container.append("<div class='twentytwenty-overlay'></div>");
      }
      var beforeImg = container.find(".graph-location:first");
      var afterImg = container.find(".graph-location:last");
      if ( $(".twentytwenty-handle").length <= 0 ) {
        container.append("<div class='twentytwenty-handle'><div class='compare-wrapper'><div class='comparename'>COMPARE</div></div><div class='close-wrapper'><div class='closebtn'><a><img src='./image/close.png' class='close'/></a></div></div></div>");
      }
      var slider = container.find(".twentytwenty-handle");
      if ( $(".twentytwenty-" + beforeDirection + "-arrow").length <= 0 ) {
        slider.append("<img src='./image/handle.png' class='handle'/><span class='twentytwenty-" + beforeDirection + "-arrow'></span>");
      }
      if ( $(".twentytwenty-" + afterDirection + "-arrow").length <= 0 ) {
        slider.append("<span class='twentytwenty-" + afterDirection + "-arrow'></span>");
      }
      container.addClass("twentytwenty-container");
      beforeImg.addClass("twentytwenty-before");
      afterImg.addClass("twentytwenty-after");
      
      var overlay = container.find(".twentytwenty-overlay");

      var calcOffset = function(dimensionPct) {
        var w = beforeImg.width();
        var h = $(window).height() - 50;
        // var h = beforeImg.height();
        var h_window = $(window).height() - 50;
        return {
          w: w+"px",
          h: h+"px",
          cw: (dimensionPct*w)+"px",
          ch: (dimensionPct*h)+"px",
          h_window: h_window + "px"
        };
      };

      var adjustContainer = function(offset) {
        if (sliderOrientation === 'vertical') {
          beforeImg.css("clip", "rect(0,"+offset.w+","+offset.ch+",0)");
        }
        else {
          // beforeImg.css("clip", "rect(0,"+offset.cw+","+offset.h_window+",0)");
          beforeImg.css("clip", "rect(0,"+offset.cw+","+offset.h+",0)");
        }
        container.css("height", offset.h);
      };

      var adjustSlider = function(pct) {
        var offset = calcOffset(pct);
        slider.css((sliderOrientation==="vertical") ? "top" : "left", (sliderOrientation==="vertical") ? offset.ch : offset.cw);
        adjustContainer(offset);
      }

      $(window).on("resize.twentytwenty", function(e) {
        adjustSlider(sliderPct);
      });

      var offsetX = 0;
      var imgWidth = 0;
      
      slider.on("movestart", function(e) {
        if (((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) && sliderOrientation !== 'vertical') {
          e.preventDefault();
        }
        else if (((e.distX < e.distY && e.distX < -e.distY) || (e.distX > e.distY && e.distX > -e.distY)) && sliderOrientation === 'vertical') {
          e.preventDefault();
        }
        container.addClass("active");
        offsetX = container.offset().left;
        offsetY = container.offset().top;
        imgWidth = beforeImg.width(); 
        imgHeight = $(window).height() - 50; 
        // imgHeight = beforeImg.height();      
      });

      slider.on("moveend", function(e) {
        container.removeClass("active");
      });

      slider.on("move", function(e) {
        if (container.hasClass("active")) {
          sliderPct = (sliderOrientation === 'vertical') ? (e.pageY-offsetY)/imgHeight : (e.pageX-offsetX)/imgWidth;
          if (sliderPct < 0) {
            sliderPct = 0;
          }
          if (sliderPct > 1) {
            sliderPct = 1;
          }
          adjustSlider(sliderPct);
        }
      });

      container.find("img").on("mousedown", function(event) {
        event.preventDefault();
      });

      $(window).trigger("resize.twentytwenty");
    });
  };

})(jQuery);
