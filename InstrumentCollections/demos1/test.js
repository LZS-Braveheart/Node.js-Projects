var http = require("http");
var fs = require("fs");
var LeiUtils=require('./LeiUtils')
//测试
LeiUtils.test();
LeiUtils.showAllFolders("./static/",function(){
	
});


// Tip：检测是不是文件夹