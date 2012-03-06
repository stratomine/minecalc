class Material
  constructor: (@_package, @_key, @_base) ->
  
  package: ->
    @_package
  
  key: ->
    @_key
  
  name: ->
    @_base.name
  
  tags: ->
    @_base.tags
