var http=require("http");
var fs=require("fs");
var server=http.createServer(function(req,res){
	if (req.url=="/") {
		//显示首页
		fs.readFile("./index.html",function(err,data){
			res.end(data);
		});
	}
});
//创捷IO
var io=require('socket.io')(server);
//监听连接事件
io.on("connection",function(socket){
	console.log("一个用户连接啦哦~~~");
	socket.on("tiwen",function(msg){
		// console.log("收到一个提问~~~"+msg);
		// socket.emit("huida","吃辣");
		io.emit("huida",msg);  
	});
});

server.listen(9898,"127.0.0.1");