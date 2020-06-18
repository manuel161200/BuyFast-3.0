"use strict";
formularioElectronicas.btnAceptar.addEventListener("click", validaFormulario);

function validaFormulario() {
    //Instancia objeto de ajax
    var oAjax = instanciarXHR(); 

    //Datos del formulario
    var sParametros = "nombre="+formularioElectronicas.nombreProducto.value.trim();
    sParametros += "&estado="+formularioElectronicas.estado.value.trim();
    sParametros += "&descripcion="+formularioElectronicas.descripcion.value.trim();
    sParametros += "&precio="+formularioElectronicas.precio.value.trim();
    sParametros += "&modelo="+formularioElectronicas.modelo.value.trim();
    sParametros += "&tipo="+formularioElectronicas.tipo.value.trim();
    sParametros = encodeURI(sParametros);

    //Validar
    var oE = window.event;
    var bValido = true;
    var sError = "";

    //Validar nombre producto
    let nombre = formularioElectronicas.nombreProducto.value.trim();
    var oExpReg = /^[a-zA-Z0-9\s]{3,15}$/;

    if (oExpReg.test(nombre) == false) {
        bValido = false;
        formularioElectronicas.nombreProducto.focus();
        sError = "El nombre de producto debe estar comprendido entre 3 y 15 caracteres";
    }

    //Validar descripcion
    let descripcion = formularioElectronicas.descripcion.value.trim();
    oExpReg = /^[\s\S]{0,200}$/;
    if (oExpReg.test(descripcion) == false) {
        if (bValido == true) {
            formularioElectronicas.descripcion.focus();
            bValido = false;
        }
        sError += "\n La descripcion debe estar comprendida entre 1 y 200 carcateres";
    }

    //Validar precio
    let precio = formularioElectronicas.precio.value.trim();
    oExpReg = /^[1-9]\d*(\.\d+)?$/;
    if (oExpReg.test(precio) == false) {
        if (bValido == true) {
            formularioProductos.precio.focus();
            bValido = false;
        }
        sError += "\n El precio deber ser números y el decimal separado con un punto";
    }

    //Validar modelo
    let modelo = formularioElectronicas.modelo.value.trim();
    oExpReg = /^[a-zA-Z0-9\s]{3,15}$/;
    if (oExpReg.test(modelo) == false) {
        if (bValido == true) {
            formularioElectronicas.modelo.focus();
            bValido = false;
        }
        sError += "\n El modelo debe ser entre 3 y 15 caracteres";
    }

    //Validar tipo
    let tipo = formularioElectronicas.tipo.value.trim();
    oExpReg = /^[a-zA-Z0-9\s]{3,15}$/;
    if (oExpReg.test(tipo) == false) {
        if (bValido == true) {
            formularioElectronicas.tipo.focus();
            bValido = false;
        }
        sError += "\n El tipo debe estar comprendido entre 3 y 15 caracteres";
    }

    //Mostrar errores
    if (bValido == false) {
        alert(sError);
        oE.preventDefault();
    } else {
        enviarElectronica();
    }

    function enviarElectronica() {
        oAjax.open("POST", encodeURI("php/altaElectronicas.php"));
        oAjax.addEventListener("readystatechange", respuestaInsert, false);
        oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        oAjax.send(sParametros);

        function respuestaInsert() {
            var oAjax = this;

            if (oAjax.readyState == 4 && oAjax.status == 200) {
                console.log(oAjax.responseText);
                var oRespuesta = JSON.parse(oAjax.responseText);

                if (oRespuesta.error == 0) {
                    $("#altaElectronicas").hide();
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