class Package
  constructor: (@_name) ->
    @_status =
      materials: false
      recipes: false
  
  load: (callback) ->
    @_timeout = new Timeout 5000, =>
      callback("error", this)
    url = "assets/packages/#{@name()}"
    _.each ["materials", "recipes"], (file) =>
      $.getJSON "#{url}/#{file}.json", (data) =>
        @["_#{file}"] = data
        @setLoaded(file)
        if @isLoaded()
          @_timeout.cancel()
          callback("success", this)
  
  setLoaded: (file) ->
    @_status[file] = true
  
  isLoaded: ->
    _.all @_status, ((value, key) -> value is true)
  
  name: ->
    @_name
  
  materials: ->
    @_materials
  
  recipes: ->
    @_recipes
  
  materialCount: ->
    _.size(@materials()) if @isLoaded()
  
  recipeCount: ->
    @recipes().length if @isLoaded()
