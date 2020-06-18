"use strict";
formularioOtros.btnAceptar.addEventListener("click", validaFormulario);

function validaFormulario() {
    //Instancia objeto de ajax
    var oAjax = instanciarXHR(); 

    //Datos del formulario
    var sParametros = "nombre="+formularioOtros.nombreProducto.value.trim();
    sParametros += "&estado="+formularioOtros.estado.value.trim();
    sParametros += "&descripcion="+formularioOtros.descripcion.value.trim();
    sParametros += "&precio="+formularioOtros.precio.value.trim();

    //Validar
    var oE = window.event;
    var bValido = true;
    var sError = "";

    //Validar nombre producto
    let nombre = formularioOtros.nombreProducto.value.trim();
    var oExpReg = /^[a-zA-Z0-9\s]{3,15}$/;

    if (oExpReg.test(nombre) == false) {
        bValido = false;
        formularioOtros.nombreProducto.focus();
        sError = "El nombre de producto debe estar comprendido entre 3 y 15 caracteres";
    }

    //Validar descripcion
    let descripcion = formularioOtros.descripcion.value.trim();
    oExpReg = /^[\s\S]{0,200}$/;
    if (oExpReg.test(descripcion) == false) {
        if (bValido == true) {
            formularioOtros.descripcion.focus();
            bValido = false;
        }
        sError += "\n La descripcion debe estar comprendida entre 5 y 200 carcateres";
    }

    //Validar precio
    let precio = formularioOtros.precio.value.trim();
    oExpReg = /^[1-9]\d*(\.\d+)?$/;
    if (oExpReg.test(precio) == false) {
        if (bValido == true) {
            formularioOtros.precio.focus();
            bValido = false;
        }
        sError += "\n El precio deber ser números y el decimal separado con un punto";
    }

    if (bValido == false) {
        alert(sError);
        oE.preventDefault();
    } else {
        enviarOtro();
    }

    function enviarOtro() {
        oAjax.open("POST", encodeURI("php/altaOtros.php"));
        oAjax.addEventListener("readystatechange", respuestaInsert, false);
        oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        oAjax.send(sParametros);

        function respuestaInsert() {
            var oAjax = this;

            if (oAjax.readyState == 4 && oAjax.status == 200) {
                console.log(oAjax.responseText);
                var oRespuesta = JSON.parse(oAjax.responseText);

                if (oRespuesta.error == 0) {
                    $("#altaOtros").hide();
                }
                alert(oRespuesta.mensaje);
            }
        }
    }
}

function instanciarXHR() {
    var xhttp = null;

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else // code for IE5 and IE6
    {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return xhttp;
}