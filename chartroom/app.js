var express = require('express');
var app = express();
//socket.io公式：
var http = require('http').Server(app);
var io = require('socket.io')(http);

var session=require('express-session');
// 使用session
app.use(session({
	secret:'keyboard cat',
	resave:false,   
	saveUninitialized:true
}));

// 设置模板引擎
app.set("view engine","ejs");

//静态服务
app.use(express.static("./public"));

var alluser=[];   
//中间件  
// 显示首页                                   
app.get("/",function(req,res,next){
	res.render("index");
});

//确认登录，检查此人是否有用户名，且昵称不能重复
app.get("/check",function(req,res,next){
	var yonghuming=req.query.yonghuming;
	if (!yonghuming) {
		res.send("必须填写用户名！");
		return;
	}
	if (alluser.indexOf(yonghuming)!= -1) {
		res.send("用户名已经被占用！");
		return;
	}
	alluser.push(yonghuming);
	// 交付session
	req.session.yonghuming=yonghuming;
	res.redirect("/chat");
});

// 聊天室
app.get("/chat",function(req,res,next){
	//必须保证登录
	if (!req.session.yonghuming) {
		res.redirect("/");
		return;
	}
	res.render("chat",{
		"yonghuming":req.session.yonghuming
	});
});

io.on("connection",function(socket){

	socket.on("liaotian",function(msg){
		console.log("服务器收到信息："+msg);
		io.emit("liaotian",msg);
	});
});

http.listen(9898);