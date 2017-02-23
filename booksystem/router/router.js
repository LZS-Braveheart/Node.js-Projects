//这个页面只关心对象
var Book=require("../models/Book.js");

exports.addbook=function(req,res,next){
	res.render("addbook");
}
exports.doaddbook=function(req,res,next){
	console.log(req.query);
	Book.create(req.query,function(err){
		if (err) {
			res.send("失败！");
		}
		res.send("保存成功！");
	});
}
//列出所有图书
exports.showIndex=function(req,res,next){
	Book.showAllBooks(function(err,result){
		console.log(result);
		res.render("index",{
			"tushu":result
		});
	});
	
}

//修改显示
exports.edit=function(req,res,next){
	Book.findBookByName(req.query.name,function(err,result){
		res.render("edit",result[0]);
	})
}  


//修改显示
exports.doedit=function(req,res,next){
	Book.findBookByName(req.query.name,function(err,result){
		res.render("edit",result[0]);
	})
}  