((function(){var a,b,c,d,e=Array.prototype.slice;d=function(){function a(a,b){this.timeout=setTimeout(b,a)}a.prototype.cancel=function(){return clearTimeout(this.timeout)};return a}();a=function(){function a(a,b,c){this._package=a;this._key=b;this._base=c}a.prototype.package=function(){return this._package};a.prototype.key=function(){return this._key};a.prototype.name=function(){return this._base.name};a.prototype.tags=function(){return this._base.tags};return a}();c=function(){function a(a){this._name=a;this._status={materials:!1,recipes:!1}}a.prototype.load=function(a){var b,c=this;this._timeout=new d(5e3,function(){return a("error",c)});b="assets/packages/"+this.name();return _.each(["materials","recipes"],function(d){return $.getJSON(""+b+"/"+d+".json",function(b){c["_"+d]=b;c.setLoaded(d);if(c.isLoaded()){c._timeout.cancel();return a("success",c)}})})};a.prototype.setLoaded=function(a){return this._status[a]=!0};a.prototype.isLoaded=function(){return _.all(this._status,function(a,b){return a===!0})};a.prototype.name=function(){return this._name};a.prototype.materials=function(){return this._materials};a.prototype.recipes=function(){return this._recipes};a.prototype.materialCount=function(){if(this.isLoaded())return _.size(this.materials())};a.prototype.recipeCount=function(){if(this.isLoaded())return this.recipes().length};return a}();b=function(){function b(){this._packages=[];this._materials={}}b.prototype.loadPackage=function(a,b){var d=this;return(new c(a)).load(function(a,c){a==="success"&&d.packages().push(c);return b(a,c)})};b.prototype.findMaterialByKey=function(b){var c,d,e,f,g;if(_.has(this._materials,b))return this._materials[b];g=b.match(/^([^\.]+)\.(.+)$/).slice(1,3),f=g[0],d=g[1];if(e=_.find(this.packages(),function(a){return a.name()===f}))if(c=_.find(e.materials(),function(a,b){return b===d})){c=new a(e,d,c);return this._materials[b]=c}};b.prototype.packages=function(){return this._packages};b.prototype.log=function(){var a;a=1<=arguments.length?e.call(arguments,0):[];if(window.console)return console.log("(Minecalc) "+a.join(" "))};return b}();$(document).ready(function(){window.minecalc=new b;return minecalc.loadPackage("vanilla",function(a,b){var c;if(a!=="success"){minecalc.log("Could not load package: "+b.name());return}minecalc.log("Loaded package: "+b.name()+" ("+b.materialCount()+" materials, "+b.recipeCount()+" recipes)");c='<li>\n  <h3><%= package.name() %></h3>\n  <h4>Materials (<%= package.materialCount() %>)</h4>\n  <ul>\n    <% _.each(package.materials(), function(material, key) {%>\n      <li><%= material.name %> (<code><%= package.name() + "." + key %></code>)</li>\n    <% }); %>\n  </ul>\n  <h4>Recipes (<%= package.recipeCount() %>)</h4>\n  <ul>\n    <% _.each(package.recipes(), function(recipe) {%>\n      <li>\n        <%= recipe.creates.amount %> <%= minecalc.findMaterialByKey(recipe.creates.material).name() %> from:\n        <ul>\n          <% _.chain(recipe.pattern).flatten().compact().reduce(function(amounts, key) { amounts[key] = amounts[key] || 0; amounts[key]++; return amounts; }, {}).each(function(amount, key) { %>\n            <li><%= amount %> <%= minecalc.findMaterialByKey(key).name() %></li>\n          <% }); %>\n        </ul>\n      </li>\n    <% }); %>\n  </ul>\n</li>';return $("#packages").append(_.template(c,{"package":b}))})})})).call(this);