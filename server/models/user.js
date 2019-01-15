var mysql = require('mysql');
//const jwt = require('jsonwebtoken');
var {Database} = require('../db/mysql.js');
//const bcrypt = require('bcryptjs');

var database = new Database({
		host     : 'localhost',
		user     : 'webuser',
		password : 'Passw0rd1',
		database : 'crm'
	});

class User {
  constructor(){

  }

getAllItems() {
  console.log('getting items');
}

saveUser(user){
  console.log('user object');
  return new Promise(function(resolve,reject){
      database.query('INSERT INTO crm.user SET ?',user).then(rows=>{

        if (!rows){
          	console.log('!rows');
          } else {
            resolve(user.username);
          }
      }).catch((e)=>{
      //  console.log('error1',e);
        reject(e);
        //return(e);
      })
      // .catch((e)=>{console.log('error2');
      // reject();}); //then
  }).catch((e)=>{
    console.log('reject2',e);
    //reject(e);
    return(e);
  });
} //function


}


module.exports = {User};
