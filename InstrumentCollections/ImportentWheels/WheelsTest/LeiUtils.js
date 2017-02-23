'use strict'
var fs = require("fs");
//将datastring转为一个对象
var querystring = require("querystring");
//处理含有文件提交的表单
var formidable = require('formidable');
//格式化时间
var sillyDateTime=require("silly-datetime");
//处理路径
var path = require("path");

   


/**
    用于引用是否成功！
*/
exports.test = function() {
    console.log("测试成功！");
}

/*
    ——————列出路径下的所有文件夹——————
    1、传入需要列出所有文件夹的文件夹路径.存储到数组中并返回
    2、例如:'./album'
    3、currentDir需要以'/'结束
    4、'./A'代表当前路径下的A文件夹
*/

exports.getAllFolders = function(currentDir,callback) {
    //currentDir需要以'/'结束
    var currentDir=currentDir+'/'
    fs.readdir(currentDir, function(err, files) {
        //用于存储子文件夹
        var allFolders = [];
        //files是个文件名的数组，并不是文件的数组，表示./album这个文件夹中的所有东西,包括文件、文件夹
        (function iterator(i) {

            // 遍历结束，返回结果
            if (i == files.length) {
                console.log(allFolders);
                callback(err,allFolders);
                return;
            }

            // 检测文件
            fs.stat(currentDir + files[i], function(err, stats) {
            	if(err){
                    callback("找不到您要找的文件：" + files[i] , null);
                }
                // 如果是文件夹
                if (stats.isDirectory()) {
                    allFolders.push(files[i]);
                }
                iterator(i + 1);
            });

        })(0);

    });
}


/*
    ——————获取指定文件夹名下的所有文件——————
    func(被静态的文件夹，查找指定的文件夹，回掉函数)——callback(err,文件数组)
    1、所查询的指定文件夹需被静态出来.例如：需要查询A文件夹下面的"xixi"文件，那么A文件夹就要被静态出来。app.use(express.static("./A"));
    2、返回指定文件夹下的所有文件
*/

exports.getAllFilesByName = function(foldsStatic,dirName, callback) {
    var foldsStatic='./'+foldsStatic+'/';
    console.log("查询文件路径："+foldsStatic);
    fs.readdir(foldsStatic+ dirName, function(err, files) {
        if (err) {
            callback(err, null);
            return;
        }
        var allFiles = [];  
        console.log(files);
        (function iterator(i) {
            if (i == files.length) {
                //遍历结束
                console.log("asdfasf");
                console.log(allFiles);
                callback(null, allFiles);
                return;
            }
            fs.stat(foldsStatic + dirName + '/'+files[i], function(err, stats) {
                console.log(foldsStatic + dirName + files[i]);
                if (err) {
                    callback("找不到文件" + files[i], null);
                    return;
                }
                if (stats.isFile()) {
                    allFiles.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0);
    });
}




/*
    处理post请求,处理表单
    处理后的数据作为回调函数的参数
*/
exports.formPost = function(req, res,callback) {
    //如果你的访问地址是这个，并且请求类型是post
    if (req.url == "/dopost" && req.method.toLowerCase() == "post") {
        var datas = "";
        //下面是post请求接收的一个公式
        //node为了追求极致，它是一个小段一个小段接收的。
        //接受了一小段，可能就给别人去服务了。防止一个过大的表单阻塞了整个进程
        req.addListener("data", function(chunk) {
            datas += chunk;
        });
        console.log("asdf");
        //全部传输完毕
        req.addListener("end", function() {
            var datastring = datas.toString();
            console.log("datastring:" + datastring);
            //将datastring转为一个对象
            var dataObj = querystring.parse(datastring);
            // 在回调函数中处理数据
            callback(dataObj);       
        });
    }
}

/*
    处理post请求,处理表单数据和上传文件(图片,文档)
    处理后的数据作为回调函数的参数
    注意：form表单的抬头——————<form action="http://127.0.0.1:9898/dopost" method="post" enctype="multipart/form-data">
    每个提交项需要有name和value属性
*/
exports.formDatasPost=function(req,res,savePosition,callback){
	    if(req.url == "/dopost" && req.method.toLowerCase() == "post"){
        //Creates a new incoming form.
        var form = new formidable.IncomingForm();   
        //设置文件上传存放地址
        form.uploadDir = savePosition;
        //执行里面的回调函数的时候，表单已经全部接收完毕了。
        form.parse(req, function(err, fields, files) {
            if(err){
                throw err;
            }
            //所有的文本域、单选框，都在fields存放；
            //所有的文件域，files
            console.log(fields);
            console.log(files);
            callback(fields,files);
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end("成功");
        });
    }
}

/*
    处理post请求,处理表单数据和上传文件(图片,文档),修改上传文件的名字和后缀名
    处理后的数据作为回调函数的参数
    注意：form表单的抬头——————<form action="http://127.0.0.1:9898/dopost" method="post" enctype="multipart/form-data">
    每个提交项需要有name和value属性
*/
exports.formDatasPostSet=function(req,res,savePosition,callback){
	    if(req.url == "/dopost" && req.method.toLowerCase() == "post"){
        //Creates a new incoming form.
        var form = new formidable.IncomingForm();   
        //设置文件上传存放地址
        form.uploadDir = savePosition;
        //执行里面的回调函数的时候，表单已经全部接收完毕了。
        form.parse(req, function(err, fields, files) {
            if(err){
                throw err;
            }

            // 判断文件尺寸
            var size =parseInt(files.Pic.size);
            if (size>2000) {
            	res.send("图片尺寸应该小于1M");
            	fs.unlink(files.Pic.path);
            	return;
            }

            console.log(fields);
            console.log(files);
            //时间，使用了第三方模块，silly-datetime
            var ttt = sillyDateTime.format(new Date(), 'YYYYMMDDHHmmss');
            var ran = parseInt(Math.random() * 89999 + 10000);
            //获取文件的后缀名
            var extname = path.extname(files.Pic.name);

            //修久路径
            var oldpath = __dirname + "/" + files.Pic.path;
            //新的路径由三个部分组成：时间戳、随机数、拓展名
            var newpath = __dirname + "/uploads/" + ttt + ran + extname;
            //改名
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    throw Error("粗错啦~啦~啦~");
                }
                callback(fields,files);
                res.writeHead(200, {'content-type': 'text/plain'});
                res.end("成功");
            });
        });
    }
}
