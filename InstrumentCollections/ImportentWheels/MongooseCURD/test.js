/**
 * Created by Danny on 2015/9/29 14:44.
 */
var express = require("express");   
var app = express();   
var db = require("./models/db.js");   
var Student = require("./models/Student.js");   


// 查询——查询所有结果
// Student.find({},function(err,result){
//     //result就是所有学生数组    
//     console.log(result);
// }); 
// 查询——查询一个结果
// Student.findOne({"name":"沙和尚"},function(err,result){
//     //result就是所有学生数组    
//     console.log(result);
// });

// 查询——查询所有结果，排序
// Student.find().sort({"age":-1}).exec(function(err,result){
// 	console.log(result);
// }); 
// 查询——查询所有结果，排序并返回指定数量结果
// Student.find().sort({"age":-1}).limit(2).exec(function(err,result){
// 	console.log(result);
// });   
// 查询结果，分页操作
// Student.find().sort({"age":1}).skip(3).limit(4).exec(function(err,result){
// 	console.log(result);   
// });  

var studentOpts ={
    "sid"  : 1300,
    "name" : '小花花',
    "age" : 19,
    "sex" : '男',
    "Kechengs" : [12,13,14]   //存放课程的kid
};

// 增
Student.create(studentOpts,function(err,result){
	console.log("成功");
});

// 删除
// Student.remove({"age":100},function(){
// 	console.log("删除成功！");
// });
                                                                                 
// 改                                                                                 
// Student.update({"age":24},{$set:{"sex":"囡囡"}},function(err,result){                       
// 	console.log("成功");                                                     
// });
                                                                        
app.listen(9898);