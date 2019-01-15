const path = require('path');
const http = require('http');
const express = require('express');
//var https = require('https');
var fs = require('fs');
var cors = require('cors');


const {userRouter} = require('./routes/userRouter');
const {projectRouter} = require('./routes/projectRouter');
const bodyParser = require('body-parser');

const publicPath = path.join(__dirname,'/../public');

var app = express();
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};



var server = http.createServer(app);

var port = 3000;




app.use(express.static(publicPath));

app.use(bodyParser.json());

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", req.get("Origin")||"*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   //other headers here
    next();
});


app.use('/project', projectRouter);
app.use('/user', userRouter);


app.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
