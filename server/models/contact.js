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
    return db.query('select aname, phone, company, title, decider, notes from crm.contacts').catch((e)=>{return Promise.reject(e)});
  }


}

module.exports = {Contact}
