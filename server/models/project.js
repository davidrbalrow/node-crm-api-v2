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

    //  var query1 = `select name,status,bids, budget, to_char(release_dt,'%Y-%m-%d') from crm.projects`
     //var query1 = 'select name,status,bids, budget, release_dt from crm.projects';
var query1='select name,status,bids, budget, release_dt from crm.projects';
      return db.query(query1).catch((e)=>{
        return Promise.reject(e);
      });
} //function



filterItem(fields) {

    //  var query1 = `select name,status,bids, budget, to_char(release_dt,'%Y-%m-%d') from crm.projects`
     //var query1 = 'select name,status,bids, budget, release_dt from crm.projects';
    if (!fields.name) {var name="%"} else {var name = `%${fields.name}%`};
    if (!fields.status) {var status="%"} else {var status = `%${fields.status}%`};
    if (!fields.bids) {var bids="%"} else {var bids = `%${fields.bids}%`};
    if (!fields.budget) {var budget="%"} else {var budget = `%${fields.budget}%`};
    if (!fields.released_dt) {var release_dt="%"} else {var release_dt = `%${fields.release_dt}%`};

    var query1 = `select name,status,bids, budget, release_dt from crm.projects where name like '${name}' and status like '${status}'
    and bids like '${bids}' and budget like '${budget}'`;
    console.log(query1);

      return db.query(query1).catch((e)=>{
        return Promise.reject(e);
      });
}
 //function

addItem(fields) {



    if (!fields.name) {var name=""} else {var name = `${fields.name}`};
    if (!fields.status) {var status=""} else {var status = `${fields.status}`};
    if (!fields.bids) {var bids=0} else {var bids = `${fields.bids}`};
    if (!fields.budget) {var budget=0} else {var budget = `${fields.budget}`};
    if (!fields.release_dt) {var release_dt="1753-01-01"} else {var release_dt = `${fields.release_dt}`};

      var query1 =`insert INTO crm.projects values ('${name}','${status}', ${bids},${budget},str_to_Date('${release_dt}','%Y-%m-%d'))`;
      console.log(query1);
      return db.query(query1).catch((e)=>{
        return Promise.reject(e);
      });
  };
//function

updateItem(fields) {



      var query1 =`update crm.projects set status = '${fields.status}', bids=${fields.bids},budget = ${fields.budget},release_dt = '${fields.release_dt}' where name = '${fields.name}'`;
      console.log(query1);


      return db.query(query1).catch((e)=>{
        return Promise.reject(e);
      });
    }
//function

deleteItem(fields) {

      var query1 =`delete from crm.projects where name = '${fields.name}'`;
      console.log(query1);

      console.log(query1);
      return db.query(query1).catch((e)=>{
        return Promise.reject(e);
      });
    }
 //function


}

module.exports = {Project};


// filterItem(fields) {
//
//
//     //  var query1 = `select name,status,bids, budget, to_char(release_dt,'%Y-%m-%d') from crm.projects`
//      //var query1 = 'select name,status,bids, budget, release_dt from crm.projects';
//     if (!fields.name) {var name="%"} else {var name = `%${fields.name}%`};
//     if (!fields.status) {var status="%"} else {var status = `%${fields.status}%`};
//     if (!fields.bids) {var bids="%"} else {var bids = `%${fields.bids}%`};
//     if (!fields.budget) {var budget="%"} else {var budget = `%${fields.budget}%`};
//     if (!fields.released_dt) {var release_dt="%"} else {var release_dt = `%${fields.release_dt}%`};
//
//     var query1 = `select name,status,bids, budget, release_dt from crm.projects where name like '${name}' and status like '${status}'`;
//     console.log(query1);
//     var whereClause={
//       name : name,
//       status : status,
//       bids : bids,
//       budget : budget,
//       release_dt : release_dt
//     };
//
//       db.query(query1).then(rows=>{
//         if (!rows){
//             console.log('!rows');
//           } else {
//             //console.log(rows);
//             resolve(rows);
//           }
//       }).catch((e)=>{
//
//         reject(e);
//       })
//
//   }).catch((e)=>{
//
//     return(e);
//   });
// } //function
