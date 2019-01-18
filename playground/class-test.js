const {Database} = require('../server/db/mysql');
const {User} = require('../server/models/user');

const {Contact} = require('../server/models/contact');

var database = new Database({
		host     : 'localhost',
		user     : 'webuser',
		password : 'Passw0rd1',
		database : 'crm'
	});


  // var user = new User();
	//
  // user.getAllItems();
  // user.saveUser(['test','abc123']);

	var contact = new Contact();

	contact.getAllItems().then((rows)=>{console.log('rows',rows)}).catch((e)=>{console.log('e',e)});
