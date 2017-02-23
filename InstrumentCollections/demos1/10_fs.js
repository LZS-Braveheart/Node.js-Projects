var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req, res) {
    //不处理小图标
    if (req.url == "/favicon.ico") {
        return;
    }
    //stat检测状态
    fs.stat("./album", function(err, stats) {
        //检测这个路径，是不是一个文件夹
        if (err) {
            throw err;
        } else {
            console.log(stats);
            console.log(stats.isDirectory());
        }
    });
});

server.listen(9898, "127.0.0.1");

// Tip：检测是不是文件夹