var express = require("express");
var app = express();
var LeiUtils = require('./LeiUtils')

app.use(express.static("./foldsStatic"));
app.use(express.static("./foldsStatic1"));

app.get('/', function(req, res) {
    LeiUtils.getAllFolders('foldsStatic',function(err, allFiles) {
    	if (err) {
    		console.log(err);
    	}
    	console.log("xixi~~"+allFiles);
    })
});

app.listen(9898);
