var express = require("express");
var app = express();
//模板引擎
app.set("view engine","ejs");

app.get("/", function(req, res) {  
	res.render("form2");
});
app.get("/submit",function(req,res){
	//得到参数
    var name = req.query.name;  
    var age = req.query.age;  
    console.log("得到参数："+name+"——"+age);
});
app.listen(9898);
