$(document).ready ->
  minecalc = new Minecalc
  minecalc.loadPackage "vanilla", (status, package) ->
    if status is "success"
      minecalc.log "Loaded package: #{package.name} (#{package.materialCount()} materials, #{package.recipeCount()} recipes)"
    else
      minecalc.log "Could not load package: #{package.name}"
