var sellerid = 0;
var aux = 0;
var account = 0;
$('#exampleModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
});



$(document).ready(function() {

$("#findentity").click(function()
{
  var user=$('input[name=customersearcher]').val();
  var  option= $('#entity').find(":selected").text();

  $.get("/getreport", {
    id : user ,
    entity : option
  }, function(data) {

$.each(data ,function(x)
{
  $("#reportdata").find('tbody').last().append("<tr><td>"+data[x].Customer+"</td><td>"+data[x].Seller+"</td><td>"+data[x].Amount+"</td></tr>");

});
    /*$("#tableID").find('tbody')
        .append($('<tr>')
            .append($('<td>')
                .append($('<img>')
                    .attr('src', 'img.png')
                    .text('Image cell')
                )
            )
        );*/






  });

  });











$("#buy").click(function(){

if(typeof $("input[name=customerid]").val()=="undefined" || $("input[name=customerid]").val()=="" )
{
return false;

}


if( $('input:checkbox:checked').length >0)
  {
    return true;

  }
  else {
    alert('Debe de seleccionar al menos un producto para comprar');

    return false;

  }

});

      $("#removebuy").click(function() {

        if( $('input:checkbox:checked').length >0){
          if (confirm('Desea eliminar estos articulos ?')) {
              $("input:checkbox[name=id]:checked").each(function() {
                  $(this).closest('tr').remove();
              });
          }}
          else {
            alert('Debe de tener al menos un articulos para eliminar de la posible compra');
          }




      });



$('#findcustomer').click(function()
{
  $.get("/getCustomerToBilled", {
      identification: $('input[name=customersearcher]').val()
  }, function(data) {
$("#nameofcustomer").text("Esta Factura esta a Nombre de "+" "+data.name+" "+data.lastName);
  $("input[name=customerid]").val(data.id);
  });
});

});
