const {User} = require('../models/user');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');
  //console.log('req',req);
  var user = new User();
  console.log('authenticate token',token);

  user.findByToken(token).then((user) =>{
    if (!user){
      return Promise.reject();
    }
    console.log('findbytoken user',user);
  //  res.send(user);
    req.username = user;
    req.token = token;
    next();
  }).catch((e)=>{
    res.status(401).send();
  });

};

module.exports = {authenticate};
