
const express = require('express');
const contactRouter = express.Router();
const _ = require('lodash');
const path = require('path');
//var cors = require('cors');
var {authenticate} = require('../middleware/authenticate');

const {Contact} = require('../models/contact');


contactRouter.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  res.header("Content-Type": "text/plain");
  //res.header('Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


contactRouter.post('/filterItem',authenticate,(req, res, next)=>{

  var contact = new Contact();

  contact.filterItem(req.body).then((items)=>{

    res.send(items);
  }).catch((e)=>{
    console.log('e',e);
    res.status(400).send(e);
  });



});

module.exports = {contactRouter};
