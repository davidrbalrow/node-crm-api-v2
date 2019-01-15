const express = require('express');
const userRouter = express.Router();
const _ = require('lodash');

const {User} = require('../models/user');


userRouter.post('/signup',(req, res, next)=>{
  var body = _.pick(req.body, ['username','password']);
  var user = new User();

  console.log('user body');

  user.saveUser(body).then((username)=>{
    res.send(username);
  }).catch((e)=>{
    console.log('e',e);
    res.status(400).send(e);
  });


})

module.exports = {userRouter};
