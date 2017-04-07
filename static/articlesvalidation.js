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


    $("#removearticles").click(function() {


      if( $('input:checkbox:checked').length > 0)
      {
        if (confirm('Desea eliminar estos articulos ?')) {
            $("input:checkbox[name=id]:checked").each(function() {
                var idOb = $(this).val();
                $.post("/removeArticle", {
                        id: idOb
                    },
                    function(data, status) {});

                $(this).closest('tr').remove();

            });
        }
      }
  else
  {
  alert('Debe de seleccionar al menos un articulo para eliminar');
}}
  );





    $("#allarticles").click(function() {

        $("input:checkbox[name=id]").prop("checked", $('#allarticles').is(':checked'));
    });

    $("button:button[name=updateArticle]").click(function() {

        $("input[name=id]").val($(this).closest('tr').children('td:eq(0)').text());
        $("input:text[name=price]").val($(this).closest('tr').children('td:eq(3)').text());
        $("input:text[name=description]").val($(this).closest('tr').children('td:eq(2)').text());

    });


    $("#update").click(function() {

        $(function() {
            $('#exampleModal').modal('toggle');
        });

        $.post("/updateArticle", {
                price: $('input[name=price]').val(),
                id: $("input[name=id]").val(),
                description: $("input:text[name=description]").val(),
            },
            function(data, status) {
                console.log("Data: " + data + "\nStatus: " + status);
            });
    });






});
