class Minecalc
  constructor: ->
    @packages = []
  
  loadPackage: (name, callback) ->
    new Package(name).load (status, package) =>
      @packages.push(package) if status is "success"
      callback(status, package)
  
  log: (args...) ->
    console.log("(Minecalc) #{args.join(" ")}") if window.console
