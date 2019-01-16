
// $(function() {

 // }); //function


jQuery('#message-form').on('submit',function(e) {
  e.preventDefault();
// var trHTML = '';
// var data1 =[];
//   jQuery.get("/project/all",function(data,status){
//
//     $.each(data, function (i, item) {
//
//            trHTML += '<tr><td>' + data[i].name + '</td><td>' + data[i].status + '</td></tr>';
//            data1.push(data[i]);
//        });
//        jQuery('#location').append(trHTML);
//
//
//        console.log(data);
//
//   });


  $("#jsGrid").jsGrid({
      width: "100%",
      height: "400px",

      inserting: true,
      editing: true,
      sorting: true,
      paging: true,
      autoload: true,

      //data: data1,

     controller: {
       loadData: function(filter) {
       return $.ajax({
           type: "GET",
           url: "/project/all",
           data: filter,
           contentType:"application/json"
       });

     },
     insertItem: function(item) {
        alert(item.name);
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
