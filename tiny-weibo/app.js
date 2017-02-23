var express=require("express");
var app=express();
var router=require("./router/router.js")

var session=require("express-session");
// session
app.use(session({   
	secret:'keyboard cat',
	resave:false,
	saveUninitialized:true         
}));

//模板引擎
app.set("view engine","ejs");

//静态处理
app.use(express.static("./public"));
app.use("/avatar",express.static("./avatar"));

// 路由表   
app.get("/",router.showIndex);                    
app.get("/regist",router.showRegist);
app.post("/doregist",router.doRegist);
app.get("/login",router.showLogin);
app.post("/dologin",router.doLogin);
app.get("/setavatar",router.showSetavatar);
app.post("/dosetavatar",router.dosetavatar);
app.get("/cut",router.showcut);
app.post("/post",router.doPost);
app.get("/docut",router.docut);
app.get("/getAllShuoShuo",router.getAllShuoShuo);//列出所有说说
app.get("/getuserinfo",router.getuserinfo);//列出所有说说
app.get("/getshuoshuoamount",router.getshuoshuoamount);//说说总数
app.get("/user/:user",router.showUser);
app.get("/userlist",router.showUserlist);//显示所有用户列表

app.listen(9898);      