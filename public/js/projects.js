$(document).ready(function(){
$('#projects').click(function(){
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
           contentType:"application/json"
       });

     },
     insertItem: function(item) {
             return $.ajax({
                 type: "POST",
                 url: "http://localhost:3000/project/addItem/",
                 data: JSON.stringify(item),
                 contentType:"application/json"
             });
         },
      updateItem: function(item) {
                 return $.ajax({
                     type: 'PUT',
                     url: 'http://localhost:3000/project/updateItem/',
                     data: JSON.stringify(item),
                     contentType:"application/json"
                 });
             },
      deleteItem: function(item) {
           return $.ajax({
                 type: "DELETE",
                 url: "/project/deleteItem",
                 data: JSON.stringify(item),
                 contentType:"application/json"
             });
         }

       },

      fields: [
          { name: "name", title: "Name", type: "text", width: 50, validate: "required" },
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
