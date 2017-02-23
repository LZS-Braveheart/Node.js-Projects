
var Student=require("../models/Student.js");
var Course=require("../models/Course.js");
// ————————————————————————————————————————————————
Course.create({"kid":100,"name":"美术课"});
Course.create({"kid":101,"name":"数学课"});
Course.create({"kid":102,"name":"英语课"});
Course.create({"kid":103,"name":"物理课"});



// ————————————————————————————————————————————————
//首页
exports.showIndex=function(req,res,next){
	Student.find({},function(err,result){
		res.render("index",{
			students:result
		});
	});
}

//插入表单
exports.showAdd=function(req,res,next){
	Course.find({},function(err,result){
		console.log("课程~~~"+result);
		res.render("add",{
			Allcourse:result
		});
	});
	
}
exports.doAdd=function(req,res,next){
	//存储数据
	console.log(req.query);
	Student.create(req.query,function(){
		console.log("插入成功！");
		Course.addStudent(req.query.courses,req.query.sid,function(){
			res.send("xixi");
		});
	});
}

//显示修改
exports.edit=function(req,res,next){
	//执行修改
	var sid=parseInt(req.params["sid"]);
	Student.findOne({"sid":sid},function(err,result){
		if (err||!result) {
			res.send("错啦！");
			return;
		}
		Course.find({},function(err,result2){
			res.render("edit",{
				"student":result,
				"allCourse":result2
			});
		});
	});
}

//执行修改
exports.doEdit=function(req,res,next){
	//执行修改
	var sid=parseInt(req.params["sid"]);
	Student.update({"sid":sid},req.query,function(){
		res.send("修改成功！");
	});
}

//执行修改
exports.remove=function(req,res,next){
	//执行修改
	var sid=parseInt(req.params["sid"]);
	console.log("嘻嘻~~"+sid);
	Student.remove({"sid":sid},function(){
		res.send("删除成功！");
	});
}

	
	
