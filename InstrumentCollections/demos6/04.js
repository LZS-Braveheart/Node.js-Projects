var fs = require('fs');
var gm = require('gm');

gm("./3.jpg").crop(141,96,152,181).write("./2.jpg",function(err){

});