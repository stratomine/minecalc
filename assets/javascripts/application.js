((function(){var a,b,c,d=Array.prototype.slice;c=function(){function a(a,b){this.timeout=setTimeout(b,a)}a.prototype.cancel=function(){return clearTimeout(this.timeout)};return a}();a=function(){function a(){this.packages=[]}a.prototype.loadPackage=function(a,c){var d=this;return(new b(a)).load(function(a,b){a==="success"&&d.packages.push(b);return c(a,b)})};a.prototype.log=function(){var a;a=1<=arguments.length?d.call(arguments,0):[];if(window.console)return console.log("(Minecalc) "+a.join(" "))};return a}();b=function(){function a(a){this.name=a;this.status={materials:!1,recipes:!1}}a.prototype.load=function(a){var b,d=this;this.timeout=new c(5e3,function(){return a("error",d)});b="assets/packages/"+this.name;return _.each(["materials","recipes"],function(c){return $.getJSON(""+b+"/"+c+".json",function(b){d[c]=b;d.setLoaded(c);if(d.isLoaded()){d.timeout.cancel();return a("success",d)}})})};a.prototype.setLoaded=function(a){return this.status[a]=!0};a.prototype.isLoaded=function(){return this.status.materials===!0&&this.status.recipes===!0};a.prototype.materialCount=function(){return _.size(this.materials)};a.prototype.recipeCount=function(){return this.recipes.length};return a}();$(document).ready(function(){var b;b=new a;return b.loadPackage("vanilla",function(a,c){var d;if(a!=="success"){b.log("Could not load package: "+c.name);return}b.log("Loaded package: "+c.name+" ("+c.materialCount()+" materials, "+c.recipeCount()+" recipes)");d='<li>\n  <h3><%= package.name %></h3>\n  <h4>Materials (<%= package.materialCount() %>)</h4>\n  <ul>\n    <% _.each(package.materials, function(material, key) {%>\n      <li><%= material.name %> (<code><%= package.name + "." + key %></code>)</li>\n    <% }); %>\n  </ul>\n  <h4>Recipes (<%= package.recipeCount() %>)</h4>\n  <ul>\n    <% _.each(package.recipes, function(recipe) {%>\n      <li>\n        <%= recipe.creates.amount %> <code><%= recipe.creates.material %></code> from:\n        <ul>\n          <% _.chain(recipe.pattern).flatten().compact().reduce(function(amounts, key) { amounts[key] = amounts[key] || 0; amounts[key]++; return amounts; }, {}).each(function(amount, key) { %>\n            <li><%= amount %> <code><%= key %></code></li>\n          <% }); %>\n        </ul>\n      </li>\n    <% }); %>\n  </ul>\n</li>';return $("#packages").append(_.template(d,{"package":c}))})})})).call(this);