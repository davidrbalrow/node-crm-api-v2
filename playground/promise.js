var a = 1;

//var loadNewContent =
function loadNewContent(xauthHeader){
  return new Promise(function(resolve,reject){
    if (a === 1)
    { resolve(xauthHeader);}
    else {
      reject('reject loadNewContent')
    }

  });
}

//var getToken =
function getToken(){
  return new Promise(function(resolve,reject){
    if (1===1)
    { resolve ('getToken');}
    else {
      reject('reject getToken')
    }

  });
}

console.log('starting');

getToken().then(loadNewContent(a)).then((x)=>{
  console.log('x',x);
});

//getToken().then(loadNewContent).then((x)=>{console.log(x)});

// getToken().then((getToken)=>{
//   loadNewContent(getToken);
// }).then((x)=>{
//   console.log(x);
// });
