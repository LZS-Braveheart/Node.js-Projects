var mongoose=require("mongoose");
var db=require("./db.js");
//schema结构。
var bookSchema = new mongoose.Schema({
	name : 	 {type : String},
	author : {type : String},
	price :  {type : Number},
	// type:    {type : Array,"default"}
});
//增加静态方法。列出所有图书
bookSchema.statics.showAllBooks=function(callback){
	this.model("Book").find({},callback);
}

//根据_id查找图书
bookSchema.statics.findBookByName=function(name,callback){
	this.model("Book").find({"name":name},callback);
}

//类
var bookModel = db.model('Book', bookSchema);
//暴露
module.exports=bookModel;