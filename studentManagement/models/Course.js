var mongoose=require("mongoose");

//schema
var courseSchema=new mongoose.Schema({
	kid:Number,
	name:String,
	students:[Number] //存放学生的ID
});

//索引
courseSchema.index({"kid":1});
courseSchema.statics.addStudent=function(kidarray,sid,callback){

	for(var i=0;i < kidarray.length; i++){
		Course.update({"kid":kidarray[i]},{$push:{"students":sid}},function(){
			console.log("添加学生成功！");
		});
	}
	
}

//model
var Course=mongoose.model("Course",courseSchema);

module.exports=Course;
