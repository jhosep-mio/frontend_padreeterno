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

/**********************************************************/
/* -CONTADOR DE CANTIDAD- */

$(document).on('click', '#agregarCntProducto', function (e) {
    var contador = parseInt($("#cantidadProducto").val());
    var contador2 = parseInt($("#cantidad2").val());
    contador++;
    if (contador > contador2) {
        return false;
    } else {
        $("#cantidadProducto").val(contador);
    }
});

$(document).on('click', '#restarCntProducto', function (e) {
    var contador = parseInt($("#cantidadProducto").val());
    contador--;
    if (contador < 1) {
        return false;
    } else {
        $("#cantidadProducto").val(contador);
    }
});

//TRAER DATOS DE PRECIO DE PRODUCTO
$(".precioProductoId").on("change", function() {
    var idOpcion = $("input[name='opciones']:checked").val();
    var idProducto = $("#id_producto").val();
        $.post(base_url + 'carrito/precio_medida',
                {idOpcion: idOpcion, idProducto: idProducto},
        function(response) {
            $('#idPrecio').val(response.idPrecio);
            $('.precioProducto').text(response.precio);
            $('.ofertaProducto').text(response.oferta);
            $('#cantidad2').val(response.cantidad);
            $('.tagofertaProducto').text(response.tagoferta);
            $('.cantidad2').text(response.cantidad);

            $(".botonagrega").show();  
            $(".select_opciones").hide();

            $(".producto_detalle_cantidad").show();  

            if (response.oferta != '') {
                $('.precioProducto').addClass('real_preciodes');
                $('.precioProducto').removeClass('ofert_preciodes');
            }else{
                $('.precioProducto').removeClass('real_preciodes');
                $('.precioProducto').addClass('ofert_preciodes');
            }
            if (response.tagoferta != '') {
                $('.tagofertaProducto').addClass('dsto_preciodes');
            }else{
                $('.tagofertaProducto').removeClass('dsto_preciodes');
            }

        }, 'json');

});

/***********************************************/

//AGREGAR PRODUCTO CON OPCION
function agregar1(id) {
    $(document).ready(function() {
        var opcion = $("input:radio[name=opciones]:checked").val();
        var cantidad = $("#cantidadProducto").val();
        var idPrecio = $("#idPrecio").val();
        var idMedida = $("#precioProductoId").val();

        if(opcion == undefined){
            alertify.alert('<h7>Seleccione una Opción</h7>')
                .set('title', 'Importante');
        }else{
            $.post(base_url + 'carrito/agregar1',
                { id: id, cantidad: cantidad , idPrecio : idPrecio , opcion : opcion , idMedida : idMedida},
            function(response) {
                console.log(response);
                $('.carrito_items').html(response.items);
                $('.carrito_total').html(response.total);
                $('#agregarmensaje1').html(response.mensaje);
                setTimeout(function() {
                    location.reload();
                }, 3000);
            }, 'json');
        }
    });
    return false;
}

//AGREGAR PRODUCTO SIN COLOR

function agregar2(id) {
    $(document).ready(function() {
        var opcion = '';
        var cantidad = $("#cantidadProducto").val();
        var idPrecio = $("#idPrecio").val();
        var idMedida = $("#precioProductoId").val();
        
            $.post(base_url + 'carrito/agregar1',
                { id: id, cantidad: cantidad , idPrecio : idPrecio , opcion : opcion , idMedida : idMedida},
            function(response) {
                console.log(response);
                $('.carrito_items').html(response.items);
                $('.carrito_total').html(response.total);
                $('#agregarmensaje1').html(response.mensaje);
                setTimeout(function() {
                    location.reload();
                }, 3000);
            }, 'json');
    });
    return false;
}


function editar(p_id,rowid_id, quantity,idPrecio) {
    $(document).ready(function() {
        quantity = $('#qty' + rowid_id).val();
        $.post(base_url + 'carrito/editar',
                {          
                    id: p_id,
                    rowid: rowid_id,
                    quantity: quantity,
                    idPrecio: idPrecio
                },
        function(response) {
            $('#agregarmensaje1').html(response.mensaje);
            setTimeout(function() {
                location.reload();
            }, 1000);
        }, 'json');
    });
}


function eliminar(rowid) {
    $(document).ready(function() {
        $.post(base_url + 'carrito/eliminar',
                {rowid: rowid},
        function(response) {
            $('#agregarmensaje1').html(response.mensaje);
            setTimeout(function() {
                location.reload();
            }, 1000);
        }, 'json');
    });
    return false;
}

/*******************/

$(".buscarProducto").on("click", function() {
    var buscar = $(".buscandoProducto").val();
    var url_buscar = buscar.replace(/\s/g, "_");
    location.href = base_url + "buscar/" + url_buscar;
});


$(".buscandoProducto").on('keyup', function(e) {
    if (e.which == 13) {
        $(".buscarProducto").trigger("click");
    }
});


/*******************/
$('.opciondespacho').on('change', function() {
    var select = $('select[id=opciondespacho]').val();
    if (select == '') {
        $(".box_enviodelivery").hide();  
        $(".box_retirocompra").hide();    
    }if (select == 1) {
        $(".box_enviodelivery").show();  
        $(".box_retirocompra").hide();  

        $(".box_pagocontraentre").hide(); 

        $(document).ready(function(){

            var departamento = $("#webDepartamentoId").val();
            var cart_count = $(".totalCarrito").val();

            $.post(base_url + 'formulario/precioDepartamento',
                    {webDepartamentoId: $('#webDepartamentoId').val()},
            function(response) {
                if(departamento !== ''){
                    var totalPrecio  = parseFloat(cart_count) + parseFloat(response[0].costo);
                    var precioSoloEnvio = parseFloat(response[0].costo);
                }else{
                    var totalPrecio  = parseFloat(cart_count) ;
                    var precioSoloEnvio = '0.00';
                }
               
                $('.precioEnvio').val(precioSoloEnvio);
                $('#totalCart').text('S/' + totalPrecio);
                $('.totalCart').val(totalPrecio);
                $('.precioSoloEnvio').text('S/' + precioSoloEnvio);
            }, 'json');
            console.log();
        });

        $(document).ready(function(){

            var distrito = $("#webDistritoId").val();
            var cart_count = $(".totalCarrito").val();
            var precioEnvios = $(".precioEnvio").val();

            $.post(base_url + 'formulario/precioDistrito',
                    {webDistritoId: $('#webDistritoId').val()},
            function(response) {
                if(distrito !== ''){
                    var totalPrecio  = parseFloat(cart_count) + parseFloat(response[0].costo);
                    var precioSoloEnvio = parseFloat(response[0].costo);
                }else{
                    var totalPrecio  = parseFloat(cart_count) + parseFloat(precioEnvios) ;
                    var precioSoloEnvio = parseFloat(precioEnvios);
                }
                $('.precioEnvio').val(precioSoloEnvio);
                $('#totalCart').text('S/' + totalPrecio);
                $('.totalCart').val(totalPrecio);
                $('.precioSoloEnvio').text('S/' + precioSoloEnvio);
            }, 'json');
            console.log();
        });


    }if (select == 2) {
        $(".box_enviodelivery").hide();  
        $(".box_retirocompra").show();  

        $(".box_pagocontraentre").show(); 

        $(document).ready(function(){

            var departamento = '';
            var cart_count = $(".totalCarrito").val();

            $.post(base_url + 'formulario/precioDepartamento',
                    {webDepartamentoId: $('#webDepartamentoId').val()},
            function(response) {
                if(departamento !== ''){
                    var totalPrecio  = parseFloat(cart_count) + parseFloat(response[0].costo);
                    var precioSoloEnvio = parseFloat(response[0].costo);
                }else{
                    var totalPrecio  = parseFloat(cart_count) ;
                    var precioSoloEnvio = '0.00';
                }
               
                $('.precioEnvio').val(precioSoloEnvio);
                $('#totalCart').text('S/' + totalPrecio);
                $('.totalCart').val(totalPrecio);
                $('.precioSoloEnvio').text('S/' + precioSoloEnvio);
            }, 'json');
            console.log();
        });

    }
});

/****************/

$('#webDepartamentoId').on('change', function() {
    $.post(base_url + 'formulario/distrito',
            {webDepartamentoId: $('#webDepartamentoId').val()},
    function(response) {
        $('#webDistritoId').html('<option value="">Seleccione un distrito</option>');
        var total = Object.keys(response).length;
        if(total !== 0){
                $('#webDistritoId').removeClass('hidden');
                var total = Object.keys(response).length;
                for (var i = 0; i < total; i++) {
                    $('#webDistritoId').append('<option value="' + response[i].id + '">' + response[i].titulo + '</option>');
                }

        }else{
            $('#webDistritoId').addClass('hidden');
            $('#webDistritoId').html('<option value="0">Seleccione un distrito</option>');
        }
    }, 'json');
    console.log();
});

/****************/

$('#webDepartamentoId').on('change', function() {

    var departamento = $("#webDepartamentoId").val();
    var cart_count = $(".totalCarrito").val();

    $.post(base_url + 'formulario/precioDepartamento',
            {webDepartamentoId: $('#webDepartamentoId').val()},
    function(response) {
        if(departamento !== ''){
            var totalPrecio  = parseFloat(cart_count) + parseFloat(response[0].costo);
            var precioSoloEnvio = parseFloat(response[0].costo);
        }else{
            var totalPrecio  = parseFloat(cart_count) ;
            var precioSoloEnvio = '0.00';
        }
       
        $('.precioEnvio').val(precioSoloEnvio);
        $('#totalCart').text('S/' + totalPrecio);
        $('.totalCart').val(totalPrecio);
        $('.precioSoloEnvio').text('S/' + precioSoloEnvio);
    }, 'json');
    console.log();
});

$('#webDistritoId').on('change', function() {

    var distrito = $("#webDistritoId").val();
    var cart_count = $(".totalCarrito").val();
    var precioEnvios = $(".precioEnvio").val();

    $.post(base_url + 'formulario/precioDistrito',
            {webDistritoId: $('#webDistritoId').val()},
    function(response) {
        if(distrito !== ''){
            var totalPrecio  = parseFloat(cart_count) + parseFloat(response[0].costo);
            var precioSoloEnvio = parseFloat(response[0].costo);
        }else{
            var totalPrecio  = parseFloat(cart_count) + parseFloat(precioEnvios) ;
            var precioSoloEnvio = parseFloat(precioEnvios);
        }
        $('.precioEnvio').val(precioSoloEnvio);
        $('#totalCart').text('S/' + totalPrecio);
        $('.totalCart').val(totalPrecio);
        $('.precioSoloEnvio').text('S/' + precioSoloEnvio);
    }, 'json');
    console.log();
});

/************************ TRANSFERENCIA ******************************************/

$('.pagotransfer').click(function(){
    var nombre = $("#nombreUsuario").val();
    var apellido = $("#apellidoUsuario").val();
    var telefono = $("#telefonoUsuario").val();
    var celular = $("#celularUsuario").val();
    var correo = $("#correoUsuario").val();
    var direccion = $("#direccionUsuario").val();
    var referencia = $("#referenciaUsuario").val();
    var mensaje = $("#commentarioUsuario").val();
    var precioEnvio = $(".precioEnvio").val();
    var despacho = $("#opciondespacho").val();
    var webDepartamentoId = $("#webDepartamentoId").val();
    var webDistritoId = $("#webDistritoId").val();

    $.blockUI({css: {border: 'none', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff'}});

    /*--- --- ---*/    

    $(".envioFormulario").attr("disabled", "disabled");

    $.ajax({

        url: base_url + 'compra/pagotransfer',

        type: "POST",

        data: "nombre=" + nombre + "&apellido=" + apellido + "&telefono=" + telefono + "&celular=" + celular + "&correo=" + correo + "&direccion=" + direccion  + "&referencia=" + referencia + "&mensaje=" + mensaje + "&precioEnvio=" + precioEnvio + "&despacho=" + despacho + "&webDepartamentoId=" + webDepartamentoId + "&webDistritoId=" + webDistritoId,

        })

            .done(function(data)

            {

                $.unblockUI({});

                $(".envioFormulario").removeAttr("disabled");

                $('.respuesta').html(data).hide().slideDown();

            })

            .error(function(data, msg)

            {

                $.unblockUI({});

                $(".envioFormulario").removeAttr("disabled");

                $('.respuesta').html("Ha ocurrido un error interno");

            });

    return false;

});

/************************ CONTRA ENTREGA ******************************************/

$('.contraentrega').click(function(){
    var nombre = $("#nombreUsuario").val();
    var apellido = $("#apellidoUsuario").val();
    var telefono = $("#telefonoUsuario").val();
    var celular = $("#celularUsuario").val();
    var correo = $("#correoUsuario").val();
    var direccion = $("#direccionUsuario").val();
    var referencia = $("#referenciaUsuario").val();
    var mensaje = $("#commentarioUsuario").val();
    var precioEnvio = $(".precioEnvio").val();
    var despacho = $("#opciondespacho").val();
    var webDepartamentoId = $("#webDepartamentoId").val();
    var webDistritoId = $("#webDistritoId").val();

    $.blockUI({css: {border: 'none', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff'}});

    /*--- --- ---*/    

    $(".envioFormulario").attr("disabled", "disabled");

    $.ajax({

        url: base_url + 'compra/contraentrega',

        type: "POST",

        data: "nombre=" + nombre + "&apellido=" + apellido + "&telefono=" + telefono + "&celular=" + celular + "&correo=" + correo + "&direccion=" + direccion  + "&referencia=" + referencia + "&mensaje=" + mensaje + "&precioEnvio=" + precioEnvio + "&despacho=" + despacho + "&webDepartamentoId=" + webDepartamentoId + "&webDistritoId=" + webDistritoId,

        })

            .done(function(data)

            {

                $.unblockUI({});

                $(".envioFormulario").removeAttr("disabled");

                $('.respuesta').html(data).hide().slideDown();

            })

            .error(function(data, msg)

            {

                $.unblockUI({});

                $(".envioFormulario").removeAttr("disabled");

                $('.respuesta').html("Ha ocurrido un error interno");

            });

    return false;

});
/**************************************/
/**************************************/
$("#response-panel").hide();
$('.pagoCulqui').on('click', function(e) {

var precioCompra = $(".totalCart").val();
var precioTotal = precioCompra * 100;

// Configura tu Culqi Checkout
    Culqi.options({
        style : {
            logo: base_url + "public/img/logo/logo.png"
        }
    });
    Culqi.settings({
      title: 'Padre Eterno',
      currency: 'PEN',
      description: 'Realizar el Pago ',
      amount: precioTotal
    });
     Culqi.open();
     e.preventDefault();    
   return false;
});


function culqi() {
  if (Culqi.token) { // ¡Objeto Token creado exitosamente!
    var token = Culqi.token.id;
    var email = Culqi.token.email;
    //En esta linea de codigo debemos enviar el "Culqi.token.id"
    //hacia tu servidor con Ajax

    var nombre = $("#nombreUsuario").val();
    var apellido = $("#apellidoUsuario").val();
    var telefono = $("#telefonoUsuario").val();
    var celular = $("#celularUsuario").val();
    var correo = $("#correoUsuario").val();
    var direccion = $("#direccionUsuario").val();
    var referencia = $("#referenciaUsuario").val();
    var mensaje = $("#commentarioUsuario").val();
    var total = $(".totalCart").val();

    var precioEnvio = $(".precioEnvio").val();
    var despacho = $("#opciondespacho").val();
    var webDepartamentoId = $("#webDepartamentoId").val();
    var webDistritoId = $("#webDistritoId").val();

    /*--- --- ---*/
    console.log(Culqi.token.id)
    $(document).ajaxStart(function(){
      run_waitMe();
    });

    $.ajax({
        type: 'POST',
        url: base_url + 'compra/pagoculqui',
        data: {nombre:nombre, apellido:apellido, telefono:telefono, celular:celular, correo:correo, direccion:direccion, referencia:referencia, mensaje:mensaje, total:total, token:token, email:email, precioEnvio:precioEnvio, despacho:despacho, webDepartamentoId:webDepartamentoId, webDistritoId:webDistritoId},
        datatype: 'json',

        success: function(data) {
           var result = "";
             if(data.constructor == String){
                //var result = JSON.parse(data);
                $('body').waitMe('hide');
                $('.respuesta').html(data);
             }
             if(data.constructor == Object){
                //var result = JSON.parse(JSON.stringify(data));
                $('body').waitMe('hide');
                $('.respuesta').html(data);
             }
           if(result.object === 'charge'){
            resultdiv(result.outcome.user_message);
           }
           if(result.object === 'error'){
               resultdiv(result.user_message);
               alert(result.merchant_message);
           }
         },
        error: function(response) {
            $('body').waitMe('hide');
            $('.respuesta').html(response);
         }

    });

  } else { // ¡Hubo algún problema!
      // Mostramos JSON de objeto error en consola
       $('#response-panel').show();
        $('.respuesta').html(Culqi.error.merchant_message);
        //$('#response').html(Culqi.error.merchant_message);
        $('body').waitMe('hide');
  }
};

function run_waitMe(){
  $('body').waitMe({
    effect: 'orbit',
    text: 'Procesando pago...',
    bg: 'rgba(255,255,255,0.7)',
    color:'#28d2c8'
  });
}

function resultdiv(message){
  $('#response-panel').show();
  $('.respuesta').html(message);
  $('body').waitMe('hide');
}