$(document).ready(function(){

var xauthHeader=localStorage.getItem('x-auth');
console.log('project',xauthHeader);
$('#contacts').click(function(){
  $('#Title').replaceWith("<div id=\"Title\" class=\"header\">Contacts</div>");

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
           url: "/contact/filterItem",
           data: JSON.stringify(filter),
           contentType:"application/json",
           headers:{"x-auth":xauthHeader}
       });

     },
     insertItem: function(item) {
             return $.ajax({
                 type: "POST",
                 url: "/contact/addItem/",
                 data: JSON.stringify(item),
                 contentType:"application/json",
                 headers:{"x-auth":xauthHeader}
             });
         },
      updateItem: function(item) {
                 return $.ajax({
                     type: 'PUT',
                     url: '/contact/updateItem/',
                     data: JSON.stringify(item),
                     contentType:"application/json",
                     headers:{"x-auth":xauthHeader}
                 });
             },
      deleteItem: function(item) {
           return $.ajax({
                 type: "DELETE",
                 url: "/contact/deleteItem",
                 data: JSON.stringify(item),
                 contentType:"application/json",
                 headers:{"x-auth":xauthHeader}
             });
         }

       },

      fields: [
          { name: "name", title: "Name", type: "text", width: 50, validate: "required" },
          { name: "phone", title:"Phone",type: "text", width: 40 },
          { name: "company", title:"Company",type: "number", width: 40 },
          { name: "title", title:"Title",type: "number", width: 70},
          { name: "decider", title:"Decider",type: "text", width:1 },
            { name: "notes", title:"Notes",type: "text", width:100 },
          { type: "control" }
      ]
  });//jsgrid
});


// navigation highlighting

$('#contacts').mouseenter(function(){
   $("#contacts").css({"background":"#ecf0f1"});
});
$('#contacts').mouseleave(function(){
   $("#contacts").css({"background":"#74b9ff"});
});


});
