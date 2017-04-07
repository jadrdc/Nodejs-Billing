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

    $("#updatecustomer").click(function() {


        account = $("input[name=account]").val();
        $(function() {
            $('#exampleModal').modal('toggle');
        });

        $.post("/updatecustomer", {
            lastname: $('input[name=lastname]').val(),
            id: aux,
            name: $("input:text[name=name]").val(),
            username: $("input:text[name=username]").val(),
            ident: $("input[name=ident]").val(),
            password: $("input[name=password]").val(),
            account: account

        }, function(data, status) {
        });
        aux = 0;
        account = 0;
}

    );

 $("#removecustomers").click(function() {

   if( $('input:checkbox:checked').length > 0)
         {
           if (confirm('Desea eliminar estos clientes ?')) {


            $("input:checkbox[name=id]:checked").each(function() {


                var idOb = $(this).val();
                $.post("/removecustomer", {
                        id: idOb
                    },
                    function(data, status) {});

                $(this).closest('tr').remove();

            });
        }
    }
else {
  alert('Debe de tener al menos un cliente seleccionado');
}
  });

    $("#allcustomers").click(function() {
        $("input:checkbox[name=id]").prop("checked", $('#allcustomers').is(':checked'));
    });


    $("button:button[name=updatecustomer]").click(function() {

        $("input[name=customerid]").val($(this).parent().siblings(":first").text());
        aux = $(this).parent().siblings(":first").text();

        $("input[name=name]").val($(this).closest('tr').children('td:eq(2)').text());
        $("input:text[name=lastname]").val($(this).closest('tr').children('td:eq(3)').text());
        $("input:text[name=ident]").val($(this).closest('tr').children('td:eq(4)').text());
        $("input[name=username]").val($(this).closest('tr').children('td:eq(5)').text());
    });


});
