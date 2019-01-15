


jQuery('#message-form').on('submit',function(e) {
  e.preventDefault();
var trHTML = '';
  jQuery.get("http://localhost:3000/project/all",function(data,status){
    //alert("Data: "+ data +"/nStatus: " + status);
    console.log(data[0].name);
    //console.log(data);

    $.each(data, function (i, item) {

           trHTML += '<tr><td>' + data[i].name + '</td><td>' + data[i].status + '</td></tr>';

       });
       jQuery('#location').append(trHTML);
  });


  });
