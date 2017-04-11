/**
 * 数据库测试
 */
var mssql = require('./utils/mssql.js'); 
var settings = require("./utils/settings.js");
//数据库配置信息
var dburl = settings.dburl;
var conn = new mssql.mssql(dburl);
/**
 *  增：insert into base_customer(Nickname,Realname,Gender) values('嘻嘻','哈哈',1);需要与必要的字段相同
 *  查：
 *  	1、select * from base_customer;
 *  	2、select * from base_customer where Nickname='思燕'
 *  	3、select top 10 * from base_customer
 *  删：delete from base_customer where Nickname="AA"
 *  改：update base_customer set Nickname='嘻嘻' where Realname='周大瓜'
 */
var sql = "select * from testsql";
conn.query(sql, function(err,data){ 
		if(!err){  
			console.log(data)      //成功返回数据  
		}
		else {
			console.log(err)      //出错返回  
		}
	}
); 