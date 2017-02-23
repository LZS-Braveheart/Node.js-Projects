//定义学生的模型
var Student=require("./models/Student.js");
//第一种
// //实例化学生类
// var xiaoxixi=new Student({"name":"q笑嘻嘻","age":"12","sex":"nan"});
// //保存学生类
// xiaoxixi.save(function(){
// 	console.log("存储成功！");
// });

//第二种,用类创建对象
// Student.create({"name":"asdf","age":"12","sex":"nan"},function(error){
// 	console.log("存储成功！");
// });
// Student.zhaoren("笑嘻嘻",function(err,result){
// 	console.log(result);
// });
Student.xiugai({"name":"笑嘻嘻"},{$set:{"age":18}},{},function(){
	console.log("年龄修改成功！");
})