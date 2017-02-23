//引包包
var mongoose = require('mongoose');
//连接数据库，miao是数据库名字
mongoose.Promise = global.Promise; 
var db=mongoose.createConnection('mongodb://localhost/DB/booksystem');
// 监听响应
db.once('open',function(callback){
 console.log("~~~数据库成功连接~~~");
});
module.exports=db;