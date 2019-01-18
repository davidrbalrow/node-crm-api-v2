var mysql = require('mysql');
const jwt = require('jsonwebtoken');
var {Database} = require('../db/mysql.js');
const bcrypt = require('bcryptjs');

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
  console.log('user password',user.password);
  return new Promise(function(resolve,reject){

      bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(user.password,salt,(err,hash)=>{
            user.password=hash;
          //  next();


      console.log('user object',user);

      database.query('INSERT INTO crm.user SET ?',user).then(rows=>{

        if (!rows){
          	console.log('!rows');
          } else {
            resolve(user.username);
          }
      }).catch((e)=>{
      //  console.log('error1',e);
        //reject(e);
        return(e);
      });
      // .catch((e)=>{console.log('error2');
      // reject();}); //then
    });
  });
  }).catch((e)=>{
    console.log('reject2',e);
    reject(e);
    //return(e);
  });
} //function

generateAuthToken(username){
return new Promise(function(resolve,reject){
  var access = 'auth';
  var token = jwt.sign({username, access}, 'abc123');
  var query1=`INSERT INTO crm.token values ('${username}', '${token}') ON DUPLICATE KEY UPDATE token='${token}'`;
  console.log(query1);
  database.query(query1).then(rows=>{

    if (!rows){
        console.log('!rows');
      } else {
        console.log('rows',rows);
        resolve(token,username);
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

    if (!rows[0]){
        return Promise.reject();
      } else {
        console.log('rows***',rows);
        resolve(rows[0].username,rows[0].token);
      }
  }).catch((e)=>{
   console.log('error1',e);
    //reject(e);
    return(e);
  })
  }).catch((e)=>{
    console.log('reject2',e);
    reject(e);
    //return(e);


});

}

findByCredentials(username,password){
return new Promise(function(resolve,reject){
var query1=`SELECT username, password FROM crm.user WHERE username = '${username}'`;
console.log(query1);
database.query(query1).then(rows=>{
  console.log('query');
  if(!rows){
      return Promise.reject();
  }
    console.log('new promise');
    bcrypt.compare(password, rows[0].password,(err,res)=>{
      if (res){
        console.log('res');
        console.log(rows[0].username);
        return Promise.resolve(rows[0].username);
      }else{
        return Promise.reject();
      }
    });

});
resolve(username);
});

};

removeToken(username,token){
  return new Promise(function(resolve,reject){
    var query1 = `delete FROM crm.token WHERE username = '${username}' and token='${token}'`;
    console.log('query1',query1);
    database.query(query1).then(rows=>{
      if (!rows){
          console.log('!rows');
        } else {
          resolve(username);
        }
    }).catch((e)=>{
     console.log('error1a',e);
      //reject(e);
      return (e);
    });
    // console.log('reject2',e);
    // reject(e);
  }).catch((e)=>{
      console.log('reject2a',e);
      reject(e);
    //  return(e);
    });


};



}


module.exports = {User};
