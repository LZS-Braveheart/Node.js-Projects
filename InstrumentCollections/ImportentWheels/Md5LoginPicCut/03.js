var fs = require('fs');
var gm = require('gm');

gm('./3.jpg')
    .resize(100,100,"!")
    .write('./3_icon.jpg', function (err) {
        if (err) {
            console.log(err);
        }
    });