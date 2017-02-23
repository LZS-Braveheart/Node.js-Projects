var mongoose=require("mongoose");

//schema
var studentSchema=new mongoose.Schema({
	sid:Number,
	name:String,
	age:Number,
	sex:String,
	courses:[Number]  //课程的主键
});
//索引
studentSchema.index({"sid":1});

//model
var Student=mongoose.model("Student",studentSchema);

module.exports=Student;
