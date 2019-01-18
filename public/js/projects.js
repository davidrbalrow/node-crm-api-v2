$(document).ready(function(){

var xauthHeader=localStorage.getItem('x-auth');
console.log('project',xauthHeader);
$('#projects').click(function(){
  $('#Title').replaceWith("<div id=\"Title\" class=\"header\">Projects</div>");

  $("#jsGrid").jsGrid({
      width: "100%",
      height: "400px",

      inserting: true,
      editing: true,
      sorting: true,
      paging: true,
      filtering: true,
      autoload: true,

      //data: data1,

     controller: {
       loadData: function(filter) {
         console.log(filter);
       return $.ajax({
           type: "POST",
           url: "/project/filterItem",
           data: JSON.stringify(filter),
           contentType:"application/json",
           headers:{"x-auth":xauthHeader}
       });

     },
     insertItem: function(item) {
             return $.ajax({
                 type: "POST",
                 url: "http://localhost:3000/project/addItem/",
                 data: JSON.stringify(item),
                 contentType:"application/json",
                 headers:{"x-auth":xauthHeader}
             });
         },
      updateItem: function(item) {
                 return $.ajax({
                     type: 'PUT',
                     url: 'http://localhost:3000/project/updateItem/',
                     data: JSON.stringify(item),
                     contentType:"application/json",
                     headers:{"x-auth":xauthHeader}
                 });
             },
      deleteItem: function(item) {
           return $.ajax({
                 type: "DELETE",
                 url: "/project/deleteItem",
                 data: JSON.stringify(item),
                 contentType:"application/json",
                 headers:{"x-auth":xauthHeader}
             });
         }

       },

      fields: [
          { name: "name", title: "Project", type: "text", width: 50, validate: "required" },
          { name: "status", title:"Status",type: "text", width: 20 },
          { name: "bids", title:"Bids",type: "number", width: 20 },
          { name: "budget", title:"Budget",type: "number", width: 20},
          { name: "release_dt", title:"Release Date",type: "text", width:30 },
          { type: "control" }
      ]
  });//jsgrid
});


// navigation highlighting

$('#projects').mouseenter(function(){
   $("#projects").css({"background":"#ecf0f1"});
});
$('#projects').mouseleave(function(){
   $("#projects").css({"background":"#74b9ff"});
});


});
