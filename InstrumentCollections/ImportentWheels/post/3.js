var express = require("express");
var app = express();
var LeiUtils=require('./LeiUtils');

//模板引擎
app.set("view engine","ejs");

app.get("/", function(req, res) {  
	res.render("form3");
});
//处理post请求
app.post("/dopost",function(req,res){
	//使用自己封装的方法处理post请求
	LeiUtils.formPost1(req,res,function(dataObj){
		//得到相关参数
		console.log(dataObj);
	});
});
app.listen(9898);
