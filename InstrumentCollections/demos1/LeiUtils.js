'use strict'
var fs = require("fs");
/**
    用于引用是否成功！
*/
exports.test=function(){
    console.log("测试成功！");
}

/*
    列出路径下的所有文件夹
    1、传入需要列出所有文件夹的文件夹路径.
    2、例如:'./album'

*/
exports.showAllFolders=function(currentDir,callback){

    fs.readdir(currentDir,function(err,files){
        //用于存储子文件夹
        var allFolders=[];
        //files是个文件名的数组，并不是文件的数组，表示./album这个文件夹中的所有东西,包括文件、文件夹
        (function iterator(i){
  
            // 遍历结束，返回结果
            if (i==files.length) {
                callback(allFolders);
                return;
            }

            // 检测文件
            fs.stat(currentDir+files[i],function(err,stats){
                // 如果是文件夹
                if (stats.isDirectory()) {
                    allFolders.push(files[i]);
                }
                iterator(i+1);
            });

        })(0);

    });
}