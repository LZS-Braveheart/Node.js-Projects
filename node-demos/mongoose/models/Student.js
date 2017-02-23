// Schema 结构
var mongoose = require('mongoose');
var db=require("./db.js");
// 创建了cshema结构
var studentSchema = new mongoose.Schema({
    name : {type : String},
    age  : {type : Number},
    sex  : {type : String}
});
//创建查找静态方法
studentSchema.statics.zhaoren=function(name,callback){
	// callback查找完毕做什么
	this.model('Student').find({name:name},callback);
}
//创建修改静态方法
studentSchema.statics.xiugai=function(conditions,update,options,callback){
	this.model('Student').update(conditions,update,options,callback);
}


//创建啦学生的模型，学生类
var studentModel=db.model('Student',studentSchema);
//向外暴露
module.exports=studentModel;