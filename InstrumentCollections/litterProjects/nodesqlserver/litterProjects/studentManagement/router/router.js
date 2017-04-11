var Student = require("../model/Student.js");
var Id=0;
//显示首页
exports.showIndex = function(req, res, next) {
	Student.findAll().then(function(students) {
		res.render("index", {
			"students": students
		});
	});
}
//显示添加学生页面
exports.showAdd = function(req, res, next) {
	res.render("add");
}
//添加学生
exports.doAdd = function(req, res, next) {
	Student.findAll().then(function(students) {
		//获取表的长度		
		var length = students.length;
		//获取提交表的信息
		var studentObj = req.query;
		//给对象添加属性ID，此属性为自增属性，默认添加到表的末尾
		console.log("这里的ID_"+Id);
		studentObj.Id = Id++;
		
		//删除对象中不相关的属性"__proto__"
		delete studentObj.__proto__;
		//插入表
		Student.create(req.query).then(function(result) {
			console.log("数据插入成功！");
			//页面重定向，重定向到列表展示页面
			res.redirect("/");
		}).catch(function(err) {
			console.log(err.message);
		});
	});
}

//删除学生
exports.removeStudent = function(req, res, next) {
	//获取参数
	var studentId = parseInt(req.params["studentId"]);
	Student.destroy({
		where: {
			Id: studentId
		}
	}).then(function(result) {
		res.redirect("/");
	});
}

//展示修改页面修改学生
exports.showEditStudent = function(req, res, next) {
	//获取参数
	var studentId = parseInt(req.params["studentId"]);
	Student.findOne({
		where: {
			Id: studentId
		}
	}).then(function(result) {
		var student = result.dataValues;
		res.render("edit", {
			"student": student
		});
	});
}
//执行修改操作
exports.editStudent = function(req, res, next) {
	//获取参数
	var studentId = parseInt(req.params["studentId"]);
	var studentObj = req.query;
	delete studentObj.__proto__;
	Student.update(studentObj,{
		where:{
			Id:studentId
		}
	}).then(function(result){
		res.redirect("/");
		console.log("修改成功~~~");
	});
}