var formidable=require("formidable");
var db=require("../models/db.js");
var md5=require("../models/md5.js")
var path=require("path");
var fs=require("fs");
var gm=require("gm");
//首页
exports.showIndex=function(req,res,next){
	// 检索数据库，查找当前用户的头像
	if(req.session.login=="1") {
		//已经有登录
		var username=req.session.username;
		var login=true;
	}else{
		//没有登录
		var username="" ;
		var login=false;
	}  
	//已经登录啦，那么就要检索数据库，查看头像登录这个人的头像
	db.find("users",{username:username},function(err,result){
			if (result.length==0) {
				var avatar="moren.jpg";
			}else{
				var avatar=result[0].avatar;
			}   
		    res.render("index", {
		        "login": login,
		        "username": username,
		        "active": "首页",
		        "avatar": avatar,//登录人的头像
		    });
	});   

	console.log("传递相关参数："+req.session.login+"——"+req.session.username);
}   
//注册页面
exports.showRegist=function(req,res,next){
	res.render("regist",{
		"login":req.session.login=="1"?true:false,
		"username":req.session.login=="1"?req.session.username:"",
		"active":"注册"
	});
}

//注册业务      
exports.doRegist=function(req,res,next){
	var form=new formidable.IncomingForm();
	form.parse(req,function(err,fields,files){
		// 得到表单之后做的事情
		var username=fields.username;
		var password=fields.password;
		// 查询数据库中是不是有这个人
		db.find("users",{"username":username},function(err,result){
			if (err) {
				res.send("-3");//服务器错误
				return;   
			}
			if (result.length!=0) {  
				res.send("-1");//被占用
				return;
			}           
			//设置md5加密
			password=md5(md5(password)+"xixi");
			//用户名没有被占用
			db.insertOne("users",{
				"username":username,
				"password":password,
				"avatar":"moren.jpg"
			},function(err,result){
				if (err) {
					res.send("-3");//服务器错误
					return;
				}  
				// 写入session
				req.session.login="1";
				req.session.username=username;   
				res.send("1");//成功
				console.log("写入session成功："+req.session.login);
			});
		});       
	});      
}   

//登录页面
exports.showLogin=function(req,res,next){
	res.render("login",{
		"login":req.session.login=="1"?true:false,
		"username":req.session.login=="1"?req.session.username:"",
		"active":"登录"
	});
}
   
//执行登录页面
exports.doLogin = function(req, res, next) {
    //查询数据库，看有无此人    
    //有的话，看密码是否匹配
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        // 得到表单之后做的事情
        var username = fields.username;
        var password = fields.password;
        var jimiPassword=md5(md5(password)+"xixi");
        db.find("users",{"username":username},function(err,result){
        	if (err) {
        		res.send("-5");
        		return;
        	}
        	// 没有这个人，用户名不存在
        	if (result.length==0) {
        		res.send("-1");
        		return;
        	}
        	// 进一步产看
        	if (jimiPassword==result[0].password){
        		// 写入session
				req.session.login="1";
				req.session.username=username;   
        		res.send("1");//成功
        		return;
        	}else{
        		res.send("-2");
        		return;
        	}
        });
        console.log(username+"~"+password);
    });
};  

//上传头像，必须保持登录状态
exports.showSetavatar=function(req,res,next){
	//必须保证登录，才能进行下一步的操作
	if (req.session.login!="1") {
		res.end("非法闯入！");
		return;
	}
	res.render("setavatar",{   
		"login":true,
		"username":req.session.username||"小嘻嘻",
		"active":"修改头像"
	});
}

// 设置头像
exports.dosetavatar = function(req, res, next) {
	//必须保证登录，才能进行下一步的操作
	if (req.session.login!="1") {
		res.end("非法闯入！");
		return;
	}
    //查询数据库，看有无此人    
    //有的话，看密码是否匹配
    var form = new formidable.IncomingForm();
    form.uploadDir=path.normalize(__dirname+"/../avatar");
    form.parse(req, function(err, fields, files) {
        // 得到表单之后做的事情  
        console.log(files);
        var oldpath=files.touxiang.path;
        var newpath=path.normalize(__dirname+"/../avatar")+"/"+req.session.username+".jpg";
        console.log(oldpath+"~~"+newpath);
       	fs.rename(oldpath, newpath,function(err){
       		if (err) {
       			res.send("失败");
       			return;
       		}
       		//缓存
       		req.session.avatar=req.session.username+".jpg";
       		res.redirect("/cut");
       	});
    });
}
//显示切图页面
exports.showcut=function(req,res){
	//必须保证登录，才能进行下一步的操作
	if (req.session.login!="1") {
		res.end("非法闯入！");
		return;
	}
	res.render("cut",{
		avatar:req.session.avatar
	});
}    

//执行切图
exports.docut=function(req,res,next){
	//必须保证登录，才能进行下一步的操作
	if (req.session.login!="1") {
		res.end("非法闯入！");
		return;
	}
    //这个页面接收几个GET请求参数
    //文件名、w、h、x、y
    var filename = req.session.avatar;
    var w = req.query.w;
    var h = req.query.h;
    var x = req.query.x;  
    var y = req.query.y;
    console.log(w+"——"+h+"——"+x+"——"+y);
    gm("./avatar/"+filename)
        .crop(w,h,x,y)   
        .resize(100,100,"!")
        .write("./avatar/"+filename,function(err){
        if(err){
            res.send("-1");
            return;
        }   
        //更改当前数据库的avatar的值
        db.updateMany("users", { "username": req.session.username },{
            $set: { "avatar": req.session.avatar }}, function(err, result){
           		res.send("1");
       		});
    });
}

//发表说说    
exports.doPost=function(req,res,next){
	//必须保证登录，才能进行下一步的操作
	if (req.session.login!="1") {
		res.end("非法闯入！");  
	}	
	var username=req.session.username;

	var form=new formidable.IncomingForm();
	form.parse(req,function(err,fields,files){
		// 得到表单之后做的事情
		var content=fields.content;
		// 查询数据库中是不是有这个人
	
		//用户名没有被占用
		db.insertOne("posts",{
			"username":username,   
			"datetime":new Date(),
			"content":content
		},function(err,result){
			if (err) {
				res.send("-3");//服务器错误
				return;
			}  
			res.send("1");//成功
		});      
	});      
}   

//列出所有说说
exports.getAllShuoShuo=function(req,res,next){
	
	//接收参数当作第几个页面
	var page=req.query.page;
	console.log("xixi~~~"+page);
	db.find("posts",{},{"pageamount":6,"page":page,"sort":{"datetime":-1}},function(err,result){
		res.json(result);
	});
}

//列出某个用户的信息
exports.getuserinfo=function(req,res,next){
	//接收参数当作第几个页面
	var username=req.query.username;
	db.find("users",{"username":username},function(err,result){
		var obj={
			"username":result[0].username,
			"avatar":result[0].avatar,
			"_id":result[0]._id
		}
		res.json(obj);  
	});
}
//s说说总数
exports.getshuoshuoamount=function(req,res,next){
	db.getAllCount("posts",function(count){
		res.send(count.toString());
	});
}

//显示某一个人的个人主页
exports.showUser=function(req,res,next){
	var user=req.params["user"];
	db.find("posts",{"username":user},function(err,result){
		db.find("users",{"username":user},function(err,result2){
				res.render("user",{
					"login":req.session.login=="1"?true:false,
					"username":req.session.login=="1"?req.session.username:"",
					"user":user,
					"active":"我的说说",
					"cirenshuoshuo":result,
					"cirentouxiang":result2[0].avatar
				});
		});
	});
}

//显示所有注册用户
exports.showUserlist = function(req, res, next) {
    var user = req.params["user"];

    db.find("users", {}, function(err, result) {
        res.render("userlist", {
            "login": req.session.login == "1" ? true : false,
            "username": req.session.login == "1" ? req.session.username : "",
            "active": "成员列表",
            "suoyouchengyuan":result
        });
    });
}
