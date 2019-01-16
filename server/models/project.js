var mysql = require('mysql');
//const jwt = require('jsonwebtoken');
var {Database} = require('../db/mysql.js');
//const bcrypt = require('bcryptjs');

var db = new Database({
		host     : 'localhost',
		user     : 'webuser',
		password : 'Passw0rd1',
		database : 'crm',
    dateStrings : 'true'
	});

class Project {
  constructor(){

  }

getAllItems() {
  console.log('getting items');
  return new Promise(function(resolve,reject){
    //  var query1 = `select name,status,bids, budget, to_char(release_dt,'%Y-%m-%d') from crm.projects`
     //var query1 = 'select name,status,bids, budget, release_dt from crm.projects';
    console.log('select');
      db.query('select name,status,bids, budget, release_dt from crm.projects').then(rows=>{
        if (!rows){
            console.log('!rows');
          } else {
            //console.log(rows);
            resolve(rows);
          }
      }).catch((e)=>{

        reject(e);
      })

  }).catch((e)=>{

    return(e);
  });
} //function

addItem(fields) {

  return new Promise(function(resolve,reject){

      var query1 =`insert INTO crm.projects value ('${fields.name}','${fields.status}', ${fields.bids},${fields.budget},${release_dt})`;
      var values = [fields.name,fields.status, 0,0,'2020-01-01'];

      db.query(query1).then((rows)=>{
        if (!rows){
            console.log('rows');
          } else {
            console.log('item added');
            resolve(rows);
          }
      }).catch((e)=>{
        console.log('error1',e);
        reject(e);
      })

  }).catch((e)=>{
console.log('error2',e);
    return(e);
  });
} //function

updateItem(fields) {

  return new Promise(function(resolve,reject){

      var query1 =`update crm.projects set status = '${fields.status}', bids=${fields.bids},budget = ${fields.budget},release_dt = '${fields.release_dt}' where name = '${fields.name}'`;
      console.log(query1);

      db.query(query1).then((rows)=>{
        if (!rows){
            console.log(rows);
          } else {
            console.log('item updated');
            resolve(rows);
          }
      }).catch((e)=>{
        console.log('error1',e);
        reject(e);
      })

  }).catch((e)=>{
    console.log('error2',e);
    return(e);
  });
} //function

deleteItem(fields) {

  return new Promise(function(resolve,reject){

      var query1 =`delete from crm.projects where name = '${fields.name}'`;
      console.log(query1);

      db.query(query1).then((rows)=>{
        if (!rows){
            console.log(rows);
          } else {
            console.log('item updated');
            resolve(rows);
          }
      }).catch((e)=>{
        console.log('error1',e);
        reject(e);
      })

  }).catch((e)=>{
    console.log('error2',e);
    return(e);
  });
} //function


}

module.exports = {Project};
