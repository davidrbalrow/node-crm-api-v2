const express = require('express');
const userRouter = express.Router();
const _ = require('lodash');

const {User} = require('../models/user');

var {authenticate} = require('../middleware/authenticate');

userRouter.post('/signup',(req, res, next)=>{
  var body = _.pick(req.body, ['username','password']);
  var user = new User();

  console.log('user body', body);

  user.saveUser(body).then((username)=>{
    return user.generateAuthToken(username)
  })
  // .catch((e)=>{
  //   console.log('e',e);
  //   status(400).send(e);
  // })
  .then((token) => {
    console.log('token',token);
    console.log('username',body.username);
    res.header('x-auth',token).send(body.username);
  }).catch((e)=>{
    res.status(400).send(e);
     console.log('catch router',e);
    reject(e);
  }).catch((e)=>{
    res.status(400).send(e);
    console.log('catch router2',e);
  });


})



userRouter.get('/me',authenticate,(req,res)=>{
  res.send(req.user);
});

// userRouter.get('/me',authenticate,(req,res)=>{
//   var token = req.header('x-auth');
//   var user = new User();
//   console.log('userme');
//
//   user.findByToken(token).then((user) =>{
//     if (!user){
//       return Promise.reject();
//     }
//     console.log('findbytoken');
//     res.send(user);
//   }).catch((e)=>{
//     res.status(401).send();
//   });
//
// });



module.exports = {userRouter};
