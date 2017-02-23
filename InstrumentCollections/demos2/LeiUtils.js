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
    列出路径下的所有文件夹
    1、传入需要列出所有文件夹的文件夹路径.
    2、例如:'./album'
*/
exports.showAllFolders = function(currentDir) {

    fs.readdir(currentDir, function(err, files) {
        //用于存储子文件夹
        var allFolders = [];
        //files是个文件名的数组，并不是文件的数组，表示./album这个文件夹中的所有东西,包括文件、文件夹
        (function iterator(i) {

            // 遍历结束，返回结果
            if (i == files.length) {
                console.log(allFolders);
                return;
            }

            // 检测文件
            fs.stat(currentDir + files[i], function(err, stats) {
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
