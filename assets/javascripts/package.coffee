class Package
  constructor: (@name) ->
    @status =
      materials: false
      recipes: false
  
  load: (callback) ->
    @timeout = new Timeout 5000, =>
      callback("error", this)
    url = "assets/packages/#{@name}"
    _.each ["materials", "recipes"], (file) =>
      $.getJSON "#{url}/#{file}.json", (data) =>
        @[file] = data
        @setLoaded(file)
        if @isLoaded()
          @timeout.cancel()
          callback("success", this)
  
  setLoaded: (file) ->
    @status[file] = true
  
  isLoaded: ->
    (@status.materials is true) and (@status.recipes is true)
  
  materialCount: ->
    _.size(@materials)
  
  recipeCount: ->
    @recipes.length
