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

filterItem(fields) {

  return new Promise(function(resolve,reject){
    //  var query1 = `select name,status,bids, budget, to_char(release_dt,'%Y-%m-%d') from crm.projects`
     //var query1 = 'select name,status,bids, budget, release_dt from crm.projects';
    if (!fields.name) {var name="%"} else {var name = `%${fields.name}%`};
    if (!fields.status) {var status="%"} else {var status = `%${fields.status}%`};
    if (!fields.bids) {var bids="%"} else {var bids = `%${fields.bids}%`};
    if (!fields.budget) {var budget="%"} else {var budget = `%${fields.budget}%`};
    if (!fields.released_dt) {var released_dt="%"} else {var released_dt = `%${fields.released_dt}%`};

    var query1 = `select name,status,bids, budget, release_dt from crm.projects where name like '${name}' and status like '${status}'`;
    console.log(query1);
    var whereClause={
      name : name,
      status : status,
      bids : bids,
      budget : budget,
      released_dt : released_dt
    };

      db.query(query1).then(rows=>{
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

      var query1 =`insert INTO crm.projects values ('${fields.name}','${fields.status}', ${fields.bids},${fields.budget},str_to_Date('${fields.release_dt}','%Y-%m-%d'))`;
      console.log(query1);
      db.query(query1).then((rows)=>{
        if (!rows){
            console.log('rows');
          } else {
            console.log('item added');
            console.log(rows);
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
