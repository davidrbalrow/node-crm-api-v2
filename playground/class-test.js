const {Database} = require('../server/db/mysql');
const {User} = require('../server/models/user');


var database = new Database({
		host     : 'localhost',
		user     : 'webuser',
		password : 'Passw0rd1',
		database : 'crm'
	});


  var user = new User();

  user.getAllItems();
  user.saveUser(['test','abc123']);
