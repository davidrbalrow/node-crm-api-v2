
jQuery('#message-form').on('submit',function(e) {
  e.preventDefault();
  console.log('login pressed');
  var username= document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var data1 = {"username" : username, "password": password};
  console.log(data1);
  getToken().then(loadNewContent).then(redirect).catch((e)=>{console.log(e)});

  //.then((page)=>{
    console.log('page sub');
  //  $("div").html(page);
  // $('div').load(page);
  });

  //getToken();


  //signIn(username, password).then((a)=>{
// //
//  console.log('a',a);
//     return loadNewContent()
//}) .then((page)=>{ $('div').html(page)});
var redirect = function redirect(){
  return new Promise(function(resolve,reject){
    window.location.replace("/portal.html");
  });
};


var loadNewContent = function loadNewContent(xauthHeader){
  return new Promise(function(resolve,reject){
  console.log('test');
  var newPageContent = $.ajax({
    type: "GET",
    url: "./project/portal",
    dataType: 'htmls',
    cors: true ,
  //  contentType:'application/json',
    headers:{
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Credentials": "true",
      "x-auth":xauthHeader
    }
});
console.log('page',newPageContent);
resolve();
//resolve(newPageContent);
});
};


var getToken = function getToken() {
return new Promise(function(resolve,reject){
  var loginUrl = "http://localhost:3000/user/login"
  var xhr = new XMLHttpRequest();
  var userElement = document.getElementById('username');
  var passwordElement = document.getElementById('password');
  var tokenElement = document.getElementById('x-auth');
  var user = userElement.value;
  var password = passwordElement.value;
var xauthHeader;

console.log('user',user);
  xhr.open('POST', loginUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('load', function() {
    xauthHeader = xhr.getResponseHeader('x-auth');
    console.log('headers',xauthHeader);
    //var responseObject = JSON.parse(this.response);
    //console.log('responsObject',JSON.stringify(responseObject));
    if (xauthHeader) {
      localStorage.setItem('x-auth', xauthHeader);
      console.log('resolving xauth');
      resolve(xauthHeader);
    } else {
      console.log("No token received");
    }
  });

  var sendObject = JSON.stringify({username: user, password: password});

  console.log('going to send', sendObject);

  xhr.send(sendObject);
});

}
