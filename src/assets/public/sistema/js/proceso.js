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

/* ------------------------------- */

$(document).on('click', '.removerInfo', function(e) {
    e.preventDefault();
    vinculo = $(this).attr("data-url");
    respuesta = $(this).attr("data-response");
    alertify.confirm('<h4 class="text-bold">¿Estas seguro que deseas continuar?</h4><p>Recuerda que la eliminación es permanente.</p>')
        .set('title', '<span class="text-warning"><i class="fa fa-exclamation-triangle"></i> Advertencia</span>')
        .set('labels', {ok: 'Continuar', cancel: 'Cancelar'})
        .set('onok', function() {
            $.blockUI({css: {border: 'none', overflow: 'hidden !important', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff'}});
            $.post(getUrl+vinculo, 
            { }, 
            function (response) {
                alertify.closeAll();
                $.unblockUI({});
                $('.'+respuesta).html(response);
            });
            return false;
        })
        .set('oncancel', function(){
            alertify.error("Se canceló el proceso.");
        });
});

/*--------------------------*/

$(document).on('click', '.removerInfoTotal', function(e) {
    e.preventDefault();
    vinculo = $(this).attr("data-url");
    respuesta = $(this).attr("data-response");
    alertify.confirm('<h4 class="text-bold">¿Estas seguro que deseas continuar?</h4><p>Recuerda que la eliminación es permanente.</p>')
        .set('title', '<span class="text-warning"><i class="fa fa-exclamation-triangle"></i> Advertencia</span>')
        .set('labels', {ok: 'Continuar', cancel: 'Cancelar'})
        .set('onok', function() {
            $.blockUI({css: {border: 'none', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff'}});
            $.post(getUrl+vinculo, 
            {
                checkRemover: $("input[name='checkRemover']").serializeArray()
            }, 
            function (response) {
                alertify.closeAll();
                $.unblockUI({});
                $('.'+respuesta).html(response);
            });
            return false;
        })
        .set('oncancel', function(){
            alertify.error("Se canceló el proceso.");
        });
});

/* ------------------------------- */

$(document).on('click', '.procesarInfo', function(e) {
    e.preventDefault();
    vinculo = $(this).attr("data-url");
    respuesta = $(this).attr("data-response");
    alertify.confirm('<h4 class="text-bold">¿Estas seguro que deseas continuar?</h4><p>Recuerda que estas continuando según tu consentimiento.</p>')
        .set('title', '<span class="text-warning"><i class="fa fa-exclamation-triangle"></i> Advertencia</span>')
        .set('labels', {ok: 'Continuar', cancel: 'Cancelar'})
        .set('onok', function() {
            $.blockUI({css: {border: 'none', overflow: 'hidden !important', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff'}});
            $.post(getUrl+vinculo, 
            { }, 
            function (response) {
                alertify.closeAll();
                $.unblockUI({});
                $('.'+respuesta).html(response);
            });
            return false;
        })
        .set('oncancel', function(){
            alertify.error("Se canceló el proceso.");
        });
});


/* ------------------------------- */

$(document).on('click', '.procesarConfirmacion', function(e) {
    e.preventDefault();
    vinculo = $(this).attr("data-url");
    respuesta = $(this).attr("data-response");
    alertify.confirm('<h4 class="text-bold">¿Estas seguro que deseas continuar?</h4>')
        .set('title', '<span class="text-warning"><i class="fa fa-exclamation-triangle"></i> Advertencia</span>')
        .set('labels', {ok: 'Continuar', cancel: 'Cancelar'})
        .set('onok', function() {
            $.blockUI({css: {border: 'none', overflow: 'hidden !important', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff'}});
            $.post(getUrl+vinculo, 
            { }, 
            function (response) {
                alertify.closeAll();
                $.unblockUI({});
                $('.'+respuesta).html(response);
            });
            return false;
        })
        .set('oncancel', function(){
            alertify.error("Se canceló el proceso.");
        });
});
/* ------------------------------- */
$(document).on('click', '.correoInfo', function(e) {
    e.preventDefault();
    vinculo = $(this).attr("data-url");
    respuesta = $(this).attr("data-response");
    alertify.confirm('<h4 class="text-bold">¿Estas seguro que deseas continuar?</h4><p>Envia un Correo según el estado de compra a tu Cliente.</p>')
        .set('title', '<span class="text-warning"><i class="fa fa-exclamation-triangle"></i> Advertencia</span>')
        .set('labels', {ok: 'Continuar', cancel: 'Cancelar'})
        .set('onok', function() {
            $.blockUI({css: {border: 'none', overflow: 'hidden !important', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff'}});
            $.post(getUrl+vinculo, 
            { }, 
            function (response) {
                alertify.closeAll();
                $.unblockUI({});
                $('.'+respuesta).html(response);
            });
            return false;
        })
        .set('oncancel', function(){
            alertify.error("Se canceló el proceso.");
        });
});

/* ------------------------------- */

function ordenarItemsproductos(id, categoriaNueva, posicionNueva, enlace, respuesta){
    $(document).ready(function(){
        $.blockUI({css: {border: 'none', overflow: 'hidden !important', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff'}});
        $.post(getUrl+enlace, 
        { id: id, categoriaNueva: categoriaNueva, posicionNueva: $('#'+posicionNueva).val() }, 
        function (response) {
            $.unblockUI({});
            $('.'+respuesta).html(response);
        });
    });
    return false;
}

/* ------------------------------- */

$(document).ready(function(){
    /*
     * ----------------------------------
     * SCRIPT PARA LA RECARGA DEL CAPTCHA
     * ----------------------------------
     */
    $('#refrescarCaptcha').on('click', function (){
        $.blockUI({css: {border: 'none', overflow: 'hidden !important', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff'}});
        $.post(baseUrl+'generar/captcha', 
        { }, 
        function (response) {
            $.unblockUI({});
            $('#obtenerCaptcha').html(response);
        });
    });
});
/*
 * ----------------------------------
 * Activar destacado registros
 * ----------------------------------
 */
function activaDestacadoProducto(id, inputId){
    $(document).ready(function() {
        $.blockUI({css: {border: 'none', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff'}});
        $.post(baseUrl+'sistema/webProducto/proceso/destacado', 
        { 
            id: id, 
            check: $('#'+inputId).is(':checked')
        }, 
        function (response) {
            $.unblockUI({});
            $('.respuesta').html(response);
        });
    });
}


/*
 * -------------------------------------
 * SCRIPT PARA ORDENAR POSICION DE ITEMS
 * -------------------------------------
 */

function ordenarItems(id, posicionNueva, enlace, respuesta){
    $(document).ready(function(){
        $.blockUI({css: {border: 'none', overflow: 'hidden !important', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff'}});
        $.post(getUrl+enlace, 
        { id: id, posicionNueva: $('#'+posicionNueva).val() }, 
        function (response) {
            $.unblockUI({});
            $('.'+respuesta).html(response);
        });
    });
    return false;
}

/*
 * -------------------------------------
 * SCRIPT PARA PROCESAR GESTION DE DATOS
 * -------------------------------------
 */
function procesarItems(id, enlace, respuesta){
    $(document).ready(function(){
        $.blockUI({css: {border: 'none', overflow: 'hidden !important', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff'}});
        $.post(getUrl+enlace, 
        { id: id}, 
        function (response) {
            $.unblockUI({});
            $('.'+respuesta).html(response);
        });
    });
    return false;
}
/*
 * -------------------------------------
 * SCRIPT PARA AGREGAR GALERIA
 * -------------------------------------
 */

 $('#procesaImagen_1').on('click', function (){
    $.blockUI({css: {border: 'none', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff'}});
    $.post(getUrl+'webImagen/proceso/panel', 
    {
        imagenCantidad : $('#imagenCantidad').val()
    }, 
    function (response) {
        $.unblockUI({});
        $('.respuesta').html(response);
        ancla = $('.respuesta').offset();
        window.scrollTo(ancla.left, ancla.top);
    });
});

function galeriaImagenAgregar(galeriaId, galeriaImagen){
    $(document).ready(function(){
        $.blockUI({css: {border: 'none', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff'}});
        var formData = new FormData();
        formData.append('galeriaId', galeriaId);
        $('#'+galeriaImagen).each(function(){
            datos = this.files;
        });
        for(var i=0; i<datos.length; i++){
            formData.append('galeriaImagen[]', datos[i]);
        }
        $.ajax({
            url: getUrl+'webImagen/proceso/agregarGaleria',
            data: formData, type: "POST",
            cache: false, contentType: false, processData: false,
            success: function(response) {
                $.unblockUI({});
                $('.respuesta').html(response);
            }
        });
    });
    return false;
}

function galeriaActualizar(imagenId){
    $(document).ready(function(){
        $.blockUI({css: {border: 'none', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff'}});
        var formData = new FormData();
        formData.append('imagenId', imagenId);
        $('#imagen'+imagenId).each(function(){
            datos = this.files;
        });
        for(var i=0; i<datos.length; i++){
            formData.append('imagen', datos[i]);
        }
        formData.append('titulo', $('#titulo'+imagenId).val());
        $.ajax({
            url: getUrl+'webImagen/proceso/editar',
            data: formData, type: "POST",
            cache: false, contentType: false, processData: false,
            success: function(response) {
                $.unblockUI({});
                $('.respuesta').html(response);
                ancla = $('.respuesta').offset();
                window.scrollTo(ancla.left, ancla.top);
            }
        });
    });
    return false;
}


$(document).on('click', '.eliminar_imagen', function(e) {
    e.preventDefault();
    url = $(this).attr("data-url");
    alertify.confirm('<h4>¿Esta seguro que desea eliminar esta imagen?</h3><h4>recuerde que la eliminacion sera permantente</h4>')
            .set('title', '<span class="fa fa-bullhorn fa-2x style="vertical-align:middle; color: red;">Importante')
            .set('labels', {ok: 'Confirmar', cancel: 'Cancelar'})
            .set('onok', function(closeEvent) {
                $.post(url,
                        {},
                        function(response) {
                            $('.respuesta').html(response);
                        });
            })
});


$('#categoriaId').on('change', function() {
    $.post(getUrl + 'webProducto/categoria',
            {categoriaId: $('#categoriaId').val()},
    function(response) {
        $('#subcategoriaId').html('<option value="">Seleccione una opción</option>');
        var total = Object.keys(response).length;
        for (var i = 0; i < total; i++) {
            $('#subcategoriaId').append('<option value="' + response[i].id + '">' + response[i].titulo + '</option>');
        }
        $('#subcategoriaId').selectpicker('refresh');
    }, 'json');
    console.log();
});


//para la agregar un item para productos
$(document).on('click', '.item', function() {
    medida = $('#medidaProducto').val();
    precio = $('#precioProducto').val();
    cantidad = $('#cantidadProducto').val();
    oferta = $('#ofertaProducto').val();

    url = $(this).attr('data-url');
    if (medida == '' || precio == 0 || cantidad == 0) {
        alertify.alert('<h4>Verifique que los campos esten completos</h4>')
                .set('title', 'Importante');
    } else {
            TBL = $('#table-item');
            TBL.find('.none').hide();
            html = '<tr class="item-' + medida + '">';
            html += '<td><input type="text" class="form-control" style="width: 220px;" name="agregar_medida[]" value="' + medida + '"></td>';
            html += '<td><input type="text" class="form-control" style="width: 70px;" name="agregar_precio[]" value="' + precio + '"></td>';
            html += '<td><input type="text" class="form-control" style="width: 70px;" name="agregar_cantidad[]" value="' + cantidad + '"></td>';
            html += '<td><input type="text" class="form-control" style="width: 70px;" name="agregar_oferta[]" value="' + oferta + '"></td>';
            html += '<td><a class="btn btn-danger removerItem btn-sm" data-toggle="tooltip" title="ELIMINAR ITEM"><i class="fa fa-close"></i></a></td>';
            html += '</tr>';
            TBL.append(html);
           $('#medidaProducto').val("");
           $('#precioProducto').val(0);
           $('#cantidadProducto').val(0);
           $('#ofertaProducto').val(0);
    }

});

//para la eliminar un item para producto
$(document).on('click', '.removerItem', function() {
    $(this).parent().parent().remove();
    return false;
});

//para la eliminar un item para producto-detalle
$(document).on('click', '.remove-item-id', function(e) {
    e.preventDefault();
    url = $(this).attr("data-url");
    id = $(this).attr("data-id");
    alertify.confirm('<h4>¿Esta seguro que desea eliminar este registro?</h4>')
            .set('title', 'Importante')
            .set('labels', {ok: 'Confirmar', cancel: 'Cancelar'})
            .set('onok', function(closeEvent) {
                $.post(url,
                        {id: id},
                function(response) {
                    $('.respuesta').html(response);
                });
            })
});

$(document).on('click', '.eliminar_imagen', function(e) {
    e.preventDefault();
    url = $(this).attr("data-url");
    alertify.confirm('<h4>¿Esta seguro que desea eliminar esta imagen?</h3><h4>recuerde que la eliminacion sera permantente</h4>')
            .set('title', '<span class="fa fa-bullhorn fa-2x style="vertical-align:middle; color: red;">Importante')
            .set('labels', {ok: 'Confirmar', cancel: 'Cancelar'})
            .set('onok', function(closeEvent) {
                $.post(url,
                        {},
                        function(response) {
                            $('.respuesta').html(response);
                        });
            })
});