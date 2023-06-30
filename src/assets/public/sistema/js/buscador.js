    /*LISTADO SUSCRIPTORES*/
    function listarSuscriptores(url, buscar) {
        console.log(url);
        if (buscar === '') {
            return;
        }
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: url,
            data: {buscar: buscar},
            success: function (response) {
                var total = Object.keys(response).length;
                $(".tablaListado").find('.resultadoListado').hide();
                $(".tablaListado").find('.tablaAjax').remove();
                for (var i = 0; i < total; i++) {
                    if (response[i].id !== null) {
                        $(".tablaListado").append('<tr class="tablaAjax"><td style="vertical-align:middle; text-align:center;">' + response[i].numero + '</td>\n\
                            <td style="vertical-align:middle; text-align:center;">' + response[i].nombre + '</td><td style="vertical-align:middle; text-align:center;">' + response[i].correo + '</td><td style="vertical-align:middle; text-align:center;">' + response[i].referencia + '</td>\n\
                            <td style="vertical-align:middle; text-align:center;">' + response[i].fecha + '</td><td style="vertical-align:middle; text-align:center;">' + response[i].accion + '</td></tr>');
                    } else
                        $(".tablaListado").append('<tr class="tablaAjax"><td colspan="6">¡Lo sentimos! No se encontraron resultados para su búsqueda</td></tr>');
                }
                if (total === 0) {
                    $(".tablaListado").append('<tr class="tablaAjax"><td colspan="6">¡Lo sentimos! No se encontraron resultados para su búsqueda</td></tr>');
                }
            }
        });
    }

    function debounce1(fn, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }

    var input_suscriptores = $('#buscadorSuscriptores');

    input_suscriptores.keyup(debounce1(function (event) {
        var url = $('#urlSuscriptores').val();
        var buscar = $('#buscadorSuscriptores').val();
        listarSuscriptores(url, buscar);
    }, 450));

    input_suscriptores.keydown(function () {
        var buscar = $('#buscadorSuscriptores').val();
        if (buscar === '') {
            $(".tablaListado").find('.resultadoListado').show();
            $(".tablaListado").find('.tablaAjax').remove();
            $(".pagination").show();
        }
    });
    /*FIN*/

    /*LISTADO PLANTILLA*/
    function listarPlantilla(url, buscar) {
        console.log(url);
        if (buscar === '') {
            return;
        }
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: url,
            data: {buscar: buscar},
            success: function (response) {
                var total = Object.keys(response).length;
                $(".tablaListado").find('.resultadoListado').hide();
                $(".tablaListado").find('.tablaAjax').remove();
                for (var i = 0; i < total; i++) {
                    if (response[i].id !== null) {
                        $(".tablaListado").append('<tr class="tablaAjax"><td style="vertical-align:middle; text-align:center;">' + response[i].numero + '</td>\n\
                            <td style="vertical-align:middle; text-align:center;">' + response[i].nombre + '</td>\n\
                            <td style="vertical-align:middle; text-align:center;">' + response[i].fecha + '</td><td style="vertical-align:middle; text-align:center;">' + response[i].accion + '</td></tr>');
                    } else
                        $(".tablaListado").append('<tr class="tablaAjax"><td colspan="4">¡Lo sentimos! No se encontraron resultados para su búsqueda</td></tr>');
                }
                if (total === 0) {
                    $(".tablaListado").append('<tr class="tablaAjax"><td colspan="4">¡Lo sentimos! No se encontraron resultados para su búsqueda</td></tr>');
                }
            }
        });
    }

    function debounce2(fn, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }

    var input_plantilla = $('#buscadorPlantilla');

    input_plantilla.keyup(debounce2(function (event) {
        var url = $('#urlPlantilla').val();
        var buscar = $('#buscadorPlantilla').val();
        listarPlantilla(url, buscar);
    }, 450));

    input_plantilla.keydown(function () {
        var buscar = $('#buscadorPlantilla').val();
        if (buscar === '') {
            $(".tablaListado").find('.resultadoListado').show();
            $(".tablaListado").find('.tablaAjax').remove();
            $(".pagination").show();
        }
    });
    /*FIN*/


    /*LISTADO INACTIVOS*/
    function listarInactivos(url, buscar) {
        console.log(url);
        if (buscar === '') {
            return;
        }
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: url,
            data: {buscar: buscar},
            success: function (response) {
                var total = Object.keys(response).length;
                $(".tablaListado").find('.resultadoListado').hide();
                $(".tablaListado").find('.tablaAjax').remove();
                for (var i = 0; i < total; i++) {
                    if (response[i].id !== null) {
                        $(".tablaListado").append('<tr class="tablaAjax"><td style="vertical-align:middle; text-align:center;">' + response[i].numero + '</td>\n\
                            <td style="vertical-align:middle; text-align:center;">' + response[i].detalle + '</td><td style="vertical-align:middle; text-align:center;">' + response[i].razon + '</td>\n\
                            <td style="vertical-align:middle; text-align:center;">' + response[i].fecha + '</td><td style="vertical-align:middle; text-align:center;">' + response[i].accion + '</td></tr>');
                    } else
                        $(".tablaListado").append('<tr class="tablaAjax"><td colspan="5">¡Lo sentimos! No se encontraron resultados para su búsqueda</td></tr>');
                }
                if (total === 0) {
                    $(".tablaListado").append('<tr class="tablaAjax"><td colspan="5">¡Lo sentimos! No se encontraron resultados para su búsqueda</td></tr>');
                }
            }
        });
    }

    function debounce3(fn, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }

    var input_inactivos = $('#buscadorInactivos');

    input_inactivos.keyup(debounce3(function (event) {
        var url = $('#urlInactivos').val();
        var buscar = $('#buscadorInactivos').val();
        listarInactivos(url, buscar);
    }, 450));

    input_inactivos.keydown(function () {
        var buscar = $('#buscadorInactivos').val();
        if (buscar === '') {
            $(".tablaListado").find('.resultadoListado').show();
            $(".tablaListado").find('.tablaAjax').remove();
            $(".pagination").show();
        }
    });
    /*FIN*/

    /*LISTADO BOLETINES*/
    function listarBoletines(url, buscar) {
        console.log(url);
        if (buscar === '') {
            return;
        }
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: url,
            data: {buscar: buscar},
            success: function (response) {
                var total = Object.keys(response).length;
                $(".tablaListado").find('.resultadoListado').hide();
                $(".tablaListado").find('.tablaAjax').remove();
                for (var i = 0; i < total; i++) {
                    if (response[i].id !== null) {
                        $(".tablaListado").append('<tr class="tablaAjax"><td style="vertical-align:middle; text-align:center;">' + response[i].numero + '</td>\n\
                            <td style="vertical-align:middle; text-align:center;">' + response[i].detalle + '</td><td style="vertical-align:middle; text-align:center;">' + response[i].estado + '</td>\n\
                            <td style="vertical-align:middle; text-align:center;">' + response[i].infoClic + '</td><td style="vertical-align:middle; text-align:center;">' + response[i].infoVis + '</td>\n\
                            <td style="vertical-align:middle; text-align:center;">' + response[i].accion + '</td></tr>');
                    } else
                        $(".tablaListado").append('<tr class="tablaAjax"><td colspan="6">¡Lo sentimos! No se encontraron resultados para su búsqueda</td></tr>');
                }
                if (total === 0) {
                    $(".tablaListado").append('<tr class="tablaAjax"><td colspan="6">¡Lo sentimos! No se encontraron resultados para su búsqueda</td></tr>');
                }
            }
        });
    }

    function debounce4(fn, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }

    var input_envio = $('#buscadorEnvio');

    input_envio.keyup(debounce4(function (event) {
        var url = $('#urlEnvio').val();
        var buscar = $('#buscadorEnvio').val();
        listarBoletines(url, buscar);
    }, 250));

    input_envio.keydown(function () {
        var buscar = $('#buscadorInactivos').val();
        if (buscar === '') {
            $(".tablaListado").find('.resultadoListado').show();
            $(".tablaListado").find('.tablaAjax').remove();
            $(".pagination").show();
        }
    });
    /*FIN*/