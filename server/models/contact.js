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

class Contact {
  constructor(){

  }

  getAllItems() {
    // return db.query('select aname, phone, company, title, decider, notes from crm.contacts').then(rows=>{
    //   return Promise.resolve(rows);
    // }).catch((e)=>{return(e);});
    return db.query('select name, phone, company, title, decider, notes from crm.contacts').catch((e)=>{return Promise.reject(e)});
  }

  filterItem(fields) {

      //  var query1 = `select name,status,bids, budget, to_char(release_dt,'%Y-%m-%d') from crm.projects`
       //var query1 = 'select name,status,bids, budget, release_dt from crm.projects';
      if (!fields.name) {var name="%"} else {var name = `%${fields.name}%`};
      if (!fields.phone) {var phone="%"} else {var phone = `%${fields.phone}%`};
      if (!fields.company) {var company="%"} else {var company = `%${fields.company}%`};
      if (!fields.title) {var title="%"} else {var title = `%${fields.title}%`};
      if (!fields.decider) {var decider="%"} else {var decider = `%${fields.decider}%`};
        if (!fields.notes) {var notes="%"} else {var notes = `%${fields.notes}%`};

      var query1 = `select name, phone, company, title, decider, notes from crm.contacts where name like '${name}' and phone like '${phone}'
      and company like '${company}' and title like '${title}'`;
      console.log(query1);

        return db.query(query1).catch((e)=>{
          return Promise.reject(e);
        });
  }


}

module.exports = {Contact}
