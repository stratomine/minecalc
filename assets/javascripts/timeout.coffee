class Timeout
  constructor: (timeout, callback) ->
    @timeout = setTimeout(callback, timeout)
  cancel: ->
    clearTimeout(@timeout)
