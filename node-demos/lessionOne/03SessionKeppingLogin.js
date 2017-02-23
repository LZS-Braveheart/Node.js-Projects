//Session保持登录状态
var session=require("express-session");
var app = require("express")();
app.use(session({
	secret:'keyboard cat',
	resave:false,
	saveUninitialized: true
}));
// http://127.0.0.1:9898/admin/aa/bb/cc/dd
app.get("/",function(req,res){
	if (req.session.login=="1") {
		res.send("欢迎你："+req.session.username);
	}else{
		res.send("亲，没有登录哦！");
	}
});
app.get("/login",function(req,res){
	req.session.login="1";
	req.session.username="嘻嘻";
	res.send("你已经登录啦哦！");

});
app.listen(9898, "127.0.0.1");
