var express = require("express");
var app = express();
var LeiUtils=require('./LeiUtils');

//模板引擎
app.set("view engine","ejs");

//处理post请求
app.post("/dopost",function(req,res){
	//使用自己封装的方法处理post请求
	LeiUtils.formDatasPost(req,res,'./formsave',function(fields,files){
		//得到相关参数
		//表单数据
		console.log(fields);
		//文件
		console.log(files);
	});
});
app.listen(9898);
