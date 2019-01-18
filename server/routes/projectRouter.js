const express = require('express');
const projectRouter = express.Router();
const _ = require('lodash');
const path = require('path');
//var cors = require('cors');
var {authenticate} = require('../middleware/authenticate');

const {Project} = require('../models/project');


projectRouter.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  res.header("Content-Type": "text/plain");
  //res.header('Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

projectRouter.get('/all',authenticate,(req, res, next)=>{

  var project = new Project();

  project.getAllItems().then((items)=>{
  //  console.log(items[0]);
    res.send(items);
  }).catch((e)=>{
    console.log('e',e);
    res.status(400).send(e);
  });
});

projectRouter.post('/filterItem',authenticate,(req, res, next)=>{

  var project = new Project();

  project.filterItem(req.body).then((items)=>{
    
    res.send(items);
  }).catch((e)=>{
    console.log('e',e);
    res.status(400).send(e);
  });



});

projectRouter.post('/addItem',authenticate,(req, res, next)=>{

  var project = new Project();

  project.addItem(req.body).then((items)=>{
    console.log('send',items);
    res.send(req.body);
  }).catch((e)=>{
    console.log('*********',e);
    res.status(400).send(e);
  });

});

projectRouter.put('/updateItem',authenticate,(req, res, next)=>{

  var project = new Project();
  project.updateItem(req.body).then((items)=>{
    res.send();
  }).catch((e)=>{
    console.log('e',e);
    res.status(400).send(e);
  });



});

projectRouter.delete('/deleteItem',authenticate,(req, res, next)=>{

  var project = new Project();
  project.deleteItem(req.body).then((items)=>{
    res.send();
  }).catch((e)=>{
    console.log('e',e);
    res.status(400).send(e);
  });


});

projectRouter.get('/portal', authenticate, (req,res,next)=>{
  //res.sendFile(path.join(__dirname,'/../../public/portal.html'));
  res.redirect('/../../portal.html');
//res.redirect('www.google.com');
});


module.exports = {projectRouter};
