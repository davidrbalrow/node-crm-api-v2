var mysql = require('mysql');
//const jwt = require('jsonwebtoken');
var {Database} = require('../db/mysql.js');
//const bcrypt = require('bcryptjs');

var db = new Database({
		host     : 'localhost',
		user     : 'webuser',
		password : 'Passw0rd1',
		database : 'crm'
	});

class Project {
  constructor(){

  }

getAllItems() {
  console.log('getting items');
  return new Promise(function(resolve,reject){
    console.log('query');
      db.query('select name,status,bids, budget, release_dt from crm.projects').then(rows=>{
console.log(rows,'rows');
        if (!rows){
            console.log('!rows');
          } else {
            resolve(rows);
          }
      }).catch((e)=>{

        reject(e);
      })

  }).catch((e)=>{

    return(e);
  });
} //function

}

module.exports = {Project};
