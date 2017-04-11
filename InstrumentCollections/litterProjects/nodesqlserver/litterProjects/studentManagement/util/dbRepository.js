var Sequelize= require('Sequelize');
var sequelize = new Sequelize('ELive_VMS', 'szelive2017', 'szelive201788', {
  host: '123.207.19.219',
  dialect: 'mssql',
  port:8989,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });
 
 var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});
 
module.exports=sequelize;
