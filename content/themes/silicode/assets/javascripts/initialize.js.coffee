$ ->
  $(document).foundation()

  $('#js-reveal-search--button').click (event) ->
    $('#js-reveal-search').foundation('reveal','open')
    $('#js-search-input').focus()
