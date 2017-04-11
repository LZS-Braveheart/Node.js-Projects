var sequelize = require('../util/dbRepository');
//console.log(sequelize);
var Sequelize = require('Sequelize');
var Student = sequelize.define('student', {
	Id: {
		type : Sequelize.INTEGER, primaryKey : true
	},
	Name: {
		type: Sequelize.STRING
	},
	Nickname: {
		type: Sequelize.STRING
	},
	Age: {
		type: Sequelize.INTEGER
	},
	Sex: {
		type: Sequelize.STRING
	}
}, {
	// don't add the timestamp attributes (updatedAt, createdAt)
	timestamps: false,

	// don't delete database entries but set the newly added attribute deletedAt
	// to the current date (when deletion was done). paranoid will only work if
	// timestamps are enabled
	paranoid: false,

	// don't use camelcase for automatically added attributes but underscore style
	// so updatedAt will be updated_at
	underscored: true,

	// disable the modification of table names; By default, sequelize will automatically
	// transform all passed model names (first parameter of define) into plural.
	// if you don't want that, set the following
	freezeTableName: true,

	// define the table's name
	tableName: 'lzs_students',

	// Enable optimistic locking.  When enabled, sequelize will add a version count attriubte
	// to the model and throw an OptimisticLockingError error when stale instances are saved.
	// Set to true or a string with the attribute name you want to use to enable.
	version: true
});
//插入记录
//Student.create({
//	Id: 4,
//	Name: '小ASDAS红',
//	Nickname: '红太阳',
//	Age: 13,
//	Sex: '女'
//}).then(function(result){
//	console.log("数据插入成功！");
//}).catch(function(err){
//	console.log(err.message);
//});
//查询记录
//Student.findAll().then(function(students){
////	console.log(students);
//	for (var i =0;i<students.length;i++) {
//		var student = students[i].dataValues;
//		var id = student.Id;
//		var name=student.Name;
//		var nickName=student.Nickname;
//		var age=student.Age;
//		var sex = student.Sex;
//		console.log(id+'—'+name+'—'+nickName+'—'+age+'—'+sex);
//	}
//});
//查询一条数据
//Student.findOne({
//		where: {
//			Id: 1
//		}
//	}).then(function(result) {
//		console.log(result);
//	});
		//修改记录
		//Student.update({
		//	Name:'山呱呱',
		//	Nickname:'哈哈哈'
		//},{
		//	where:{
		//		ID:1
		//	}
		//}).then(function(result){
		//	console.log(result);
		//});
		//删除记录
//		Student.destroy({
//			where: {
//				Nickname: '红太阳'
//			}
//		}).then(function(result) {
//			console.log('destroy user');
//			console.log(result);
//		});
		module.exports = Student;