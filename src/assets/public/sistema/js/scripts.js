$(document).on('change', '.btn-file :file', function() {
    var input=$(this),numFiles=input.get(0).files?input.get(0).files.length:1,label=input.val().replace(/\\/g,"/").replace(/.*\//,"");input.trigger("fileselect",[numFiles,label]);
});
$('.btn-file :file').on('fileselect', function(event, numFiles, label) {
//    var input=$(this).parents(".input-group").find(":text"),log=numFiles>1?numFiles+" files selected":label;input.length?input.val(log):log&&alert(log);
    var input=$(this).parents(".input-group").find(":text"),log=numFiles>1?numFiles+" files selected":label;input.length?input.val(log):log;
});
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
var position;$(document).bind("cbox_open",function(){position=$("html,body").scrollTop(),$("html").css({overflow:"hidden"})}),$(document).bind("cbox_closed",function(){$("html").css({overflow:"auto"})});
//document.oncontextmenu = function(){return false};
//document.ondragstart = function(){return false;};

/*--------------------------------------------*/
/*------------------ APIS --------------------*/
/*--------------------------------------------*/

/*
 * --------------------------------------------
 * SCRIPT PARA ELIMINAR UN GRUPO DE INFORMACIÓN
 * --------------------------------------------
 */
$("#checkTodo").change(function () {
    if ($(this).is(':checked')) {
        //$("input[type=checkbox]").prop('checked', true); //todos los check
        $("#infoTable input[type=checkbox]").prop('checked', true); //solo los del objeto #diasHabilitados
    } else {
        //$("input[type=checkbox]").prop('checked', false);//todos los check
        $("#infoTable input[type=checkbox]").prop('checked', false);//solo los del objeto #diasHabilitados
    }
});


function init_contadorTa(idtextarea, idcontador, max){
    $(document).ready(function(){
        $("#"+idtextarea).keyup(function(){
            updateContadorTa(idtextarea, idcontador, max);
        });
        $("#"+idtextarea).change(function(){
            updateContadorTa(idtextarea, idcontador, max);
        });
    });
}

function updateContadorTa(idtextarea, idcontador,max){
    $(document).ready(function(){
        var contador = $("#"+idcontador);
        var ta = $("#"+idtextarea);
        contador.html("0/"+max);
        contador.html(ta.val().length+"/"+max);
        if(parseInt(ta.val().length)>max){
            ta.val(ta.val().substring(0,max-1));
            contador.html(max+"/"+max);
        }
    });
}