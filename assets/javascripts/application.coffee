$(document).ready ->
  minecalc = new Minecalc
  minecalc.loadPackage "vanilla", (status, package) ->
    if status isnt "success"
      minecalc.log "Could not load package: #{package.name}"
      return
    
    minecalc.log "Loaded package: #{package.name} (#{package.materialCount()} materials, #{package.recipeCount()} recipes)"
    
    template = """
               <li>
                 <h3><%= package.name %></h3>
                 <h4>Materials (<%= package.materialCount() %>)</h4>
                 <ul>
                   <% _.each(package.materials, function(material, key) {%>
                     <li><%= material.name %> (<code><%= package.name + "." + key %></code>)</li>
                   <% }); %>
                 </ul>
                 <h4>Recipes (<%= package.recipeCount() %>)</h4>
                 <ul>
                   <% _.each(package.recipes, function(recipe) {%>
                     <li>
                       <%= recipe.creates.amount %> <code><%= recipe.creates.material %></code> from:
                       <ul>
                         <% _.chain(recipe.pattern).flatten().compact().reduce(function(amounts, key) { amounts[key] = amounts[key] || 0; amounts[key]++; return amounts; }, {}).each(function(amount, key) { %>
                           <li><%= amount %> <code><%= key %></code></li>
                         <% }); %>
                       </ul>
                     </li>
                   <% }); %>
                 </ul>
               </li>
               """
    $("#packages").append(_.template(template, { "package": package }))
