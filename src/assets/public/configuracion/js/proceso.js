/* ------------------------------- */
$(document).on('submit', '.formulario', function() {
    $.blockUI({css: {border: 'none', overflow: 'hidden !important', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff'}});
    var formulario = $(this);
    var metodoEnvio = formulario.attr('method');
    $.ajax({
        url: formulario.attr('action'),
        type: metodoEnvio,
        data: formulario.serialize(),
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        success: function(response) {
            $.unblockUI({});
            formulario.find('.respuesta').html(response);
        }, 
        error: function(){
            $.unblockUI({});
            alert('Ha ocurrido un error interno.');
        }
    });
    return false;
});