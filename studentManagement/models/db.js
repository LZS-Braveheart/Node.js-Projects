var mongoose=require("mongoose");
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost/DB/studentManagement");

var db=mongoose.connection;
db.once("open",function(callback){
	console.log("数据库成功打开！");
});

module.exports.db;