var http = require("http");
var fs = require("fs");
var server = http.createServer(function(req, res) {
	//不处理小图标
	if(req.url == "/favicon.ico"){
		return;
	}
    fs.mkdir('./helloDir', function(err) {
        if (err) throw err;
    });
});
server.listen(9898, "127.0.0.1");

// Tip：文件夹不能嵌套创建