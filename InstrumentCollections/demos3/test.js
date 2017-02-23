var http = require("http");
var fs = require("fs");
var LeiUtils = require('./LeiUtils')
    //测试
LeiUtils.test();



//创建服务器
var server = http.createServer(function(req, res) {

    LeiUtils.showAllFolders('./node_modules')
});

server.listen(9898, "127.0.0.1");
