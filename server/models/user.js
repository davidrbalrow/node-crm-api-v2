var mysql = require('mysql');
const jwt = require('jsonwebtoken');
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

generateAuthToken(username){
return new Promise(function(resolve,reject){
  var access = 'auth';
  var token = jwt.sign({username, access}, 'abc123');
  var query1=`INSERT INTO crm.token values ('${username}', '${token}')`;
  console.log(query1);
  database.query(query1).then(rows=>{

    if (!rows){
        console.log('!rows');
      } else {
        console.log(username);
        resolve(rows.token,rows.username);
      }
  }).catch((e)=>{
   console.log('error1',e);
    //reject(e);
    return(e);
  }).catch((e)=>{
    console.log('reject2',e);
    reject(e);
    //return(e);
  });
});
}

findByToken(token){
return new Promise(function(resolve,reject){
  var decoded;

  try {
    console.log('decoding');
    decoded = jwt.verify(token, 'abc123');
    console.log(decoded);
  } catch (e){
    reject(e);
  }
//
  var query1=`SELECT username, token FROM crm.token WHERE username = '${decoded.username}' and token='${token}'`;
  console.log(query1);
  database.query(query1).then(rows=>{

    if (!rows){
        console.log('!rows');
      } else {
        console.log('rows',rows[0].username);
        resolve(rows[0].username,rows[0].token);
      }
  }).catch((e)=>{
   console.log('error1',e);
    //reject(e);
    return(e);
  }).catch((e)=>{
    console.log('reject2',e);
    reject(e);
    //return(e);
  });


});

}


}


module.exports = {User};
