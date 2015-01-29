###*
Main JS file for Casper behaviours
###

# globals jQuery, document
(($, sr, undefined_) ->
  "use strict"
  $document = $(document)

  # debouncing function from John Hann
  # http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  debounce = (func, threshold, execAsap) ->
    timeout = undefined
    debounced = ->
      delayed = ->
        func.apply obj, args  unless execAsap
        timeout = null
        return
      obj = this
      args = arguments
      if timeout
        clearTimeout timeout
      else func.apply obj, args  if execAsap
      timeout = setTimeout(delayed, threshold or 100)
      return

  $document.ready ->
    updateImageWidth = ->
      $this = $(this)
      contentWidth = $postContent.outerWidth() # Width of the content
      imageWidth = @naturalWidth # Original image resolution
      if imageWidth >= contentWidth
        $this.addClass "full-img"
      else
        $this.removeClass "full-img"
      return
    casperFullImg = ->
      $img.each updateImageWidth
      return
    $postContent = $(".post-content")
    $postContent.fitVids()
    $img = $("img").on("load", updateImageWidth)
    casperFullImg()
    $(window).smartresize casperFullImg
    $(".scroll-down").arctic_scroll()
    return


  # smartresize
  jQuery.fn[sr] = (fn) ->
    (if fn then @bind("resize", debounce(fn)) else @trigger(sr))


  # Arctic Scroll by Paul Adam Davis
  # https://github.com/PaulAdamDavis/Arctic-Scroll
  $.fn.arctic_scroll = (options) ->
    defaults =
      elem: $(this)
      speed: 500

    allOptions = $.extend(defaults, options)
    allOptions.elem.click (event) ->
      event.preventDefault()
      $this = $(this)
      $htmlBody = $("html, body")
      offset = (if ($this.attr("data-offset")) then $this.attr("data-offset") else false)
      position = (if ($this.attr("data-position")) then $this.attr("data-position") else false)
      toMove = undefined
      if offset
        toMove = parseInt(offset)
        $htmlBody.stop(true, false).animate
          scrollTop: ($(@hash).offset().top + toMove)
        , allOptions.speed
      else if position
        toMove = parseInt(position)
        $htmlBody.stop(true, false).animate
          scrollTop: toMove
        , allOptions.speed
      else
        $htmlBody.stop(true, false).animate
          scrollTop: ($(@hash).offset().top)
        , allOptions.speed
      return

    return

  return
) jQuery, "smartresize"
