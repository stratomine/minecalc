class Minecalc
  constructor: ->
    @_packages = []
    @_materials = {}
  
  loadPackage: (name, callback) ->
    new Package(name).load (status, package) =>
      @packages().push(package) if status is "success"
      callback(status, package)
  
  findMaterialByKey: (key) ->
    if _.has(@_materials, key)
      return @_materials[key]
    [packageName, materialName] = key.match(/^([^\.]+)\.(.+)$/)[1..2]
    if package = _.find(@packages(), ((package) -> package.name() is packageName))
      if material = _.find(package.materials(), ((material, key) -> key is materialName))
        material = new Material(package, materialName, material)
        @_materials[key] = material
  
  packages: ->
    @_packages
  
  log: (args...) ->
    console.log("(Minecalc) #{args.join(" ")}") if window.console
