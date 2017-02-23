var express=require("express");
var MongoClient=require("mongodb").MongoClient;

var app=express();

var dbURL='mongodb://localhost:27017/DB/shanguagua';

app.get("/",function(req,res){
	MongoClient.connect(dbURL,function(err,db){
		if (err) {
			res.send("数据库连接失败~~~");
			return;
		}
		res.write("亲爱的，数据库连接成功啦~~~");
		db.collection("teacher").insertOne({"name":"雷宗山"},function(err,result){
			if (err) {
				res.send("数据库写入失败");
			}
			res.write("数据插入成功");
			res.end();
			db.close();
		});
	});
});

app.listen(9898);