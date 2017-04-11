var express = require("express");
var app = express();
var router=require("./router/router.js");
//设置模板引擎
app.set("view engine","ejs");  

//路由表  
//显示首页
app.get('/',router.showIndex);
//显示添加页面
app.get("/add",router.showAdd);
//执行添加
app.get("/doAdd",router.doAdd);
//删除学生
app.get("/remove/:studentId",router.removeStudent);
//显示修改页面
app.get("/edit/:studentId",router.showEditStudent);
//执行修改
app.get("/doedit/:studentId",router.editStudent);
app.listen(8080);
