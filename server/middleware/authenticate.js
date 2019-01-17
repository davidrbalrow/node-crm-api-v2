const {User} = require('../models/user');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');
  var user = new User();
  console.log('userme');

  user.findByToken(token).then((user) =>{
    if (!user){
      return Promise.reject();
    }
    console.log('findbytoken');
  //  res.send(user);
    req.user = user;
    req.token = token;
    next();
  }).catch((e)=>{
    res.status(401).send();
  });

};

module.exports = {authenticate};
