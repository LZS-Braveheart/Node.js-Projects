var http = require("http");

var server = http.createServer(function(req,res){
	// req.url的演示，能够得到用户的请求的地址
	console.log(req.url);
	//用于终止请求，让小菊花停止转动
	res.end();
});

server.listen(3000,"127.0.0.1");

// http://127.0.0.1:9898/aaa/bbb
// req.url————/qwe/asdf