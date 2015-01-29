
/**
Main JS file for Casper behaviours
 */

(function() {
  (function($, sr, undefined_) {
    "use strict";
    var $document, debounce;
    $document = $(document);
    debounce = function(func, threshold, execAsap) {
      var debounced, timeout;
      timeout = void 0;
      return debounced = function() {
        var args, delayed, obj;
        delayed = function() {
          if (!execAsap) {
            func.apply(obj, args);
          }
          timeout = null;
        };
        obj = this;
        args = arguments;
        if (timeout) {
          clearTimeout(timeout);
        } else {
          if (execAsap) {
            func.apply(obj, args);
          }
        }
        timeout = setTimeout(delayed, threshold || 100);
      };
    };
    $document.ready(function() {
      var $img, $postContent, casperFullImg, updateImageWidth;
      updateImageWidth = function() {
        var $this, contentWidth, imageWidth;
        $this = $(this);
        contentWidth = $postContent.outerWidth();
        imageWidth = this.naturalWidth;
        if (imageWidth >= contentWidth) {
          $this.addClass("full-img");
        } else {
          $this.removeClass("full-img");
        }
      };
      casperFullImg = function() {
        $img.each(updateImageWidth);
      };
      $postContent = $(".post-content");
      $postContent.fitVids();
      $img = $("img").on("load", updateImageWidth);
      casperFullImg();
      $(window).smartresize(casperFullImg);
      $(".scroll-down").arctic_scroll();
    });
    jQuery.fn[sr] = function(fn) {
      if (fn) {
        return this.bind("resize", debounce(fn));
      } else {
        return this.trigger(sr);
      }
    };
    $.fn.arctic_scroll = function(options) {
      var allOptions, defaults;
      defaults = {
        elem: $(this),
        speed: 500
      };
      allOptions = $.extend(defaults, options);
      allOptions.elem.click(function(event) {
        var $htmlBody, $this, offset, position, toMove;
        event.preventDefault();
        $this = $(this);
        $htmlBody = $("html, body");
        offset = ($this.attr("data-offset") ? $this.attr("data-offset") : false);
        position = ($this.attr("data-position") ? $this.attr("data-position") : false);
        toMove = void 0;
        if (offset) {
          toMove = parseInt(offset);
          $htmlBody.stop(true, false).animate({
            scrollTop: $(this.hash).offset().top + toMove
          }, allOptions.speed);
        } else if (position) {
          toMove = parseInt(position);
          $htmlBody.stop(true, false).animate({
            scrollTop: toMove
          }, allOptions.speed);
        } else {
          $htmlBody.stop(true, false).animate({
            scrollTop: ($(this.hash).offset().top)
          }, allOptions.speed);
        }
      });
    };
  })(jQuery, "smartresize");

}).call(this);
