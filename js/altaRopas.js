"use strict";
formularioRopas.btnAceptar.addEventListener("click", validaFormulario);

function validaFormulario() {
    //Instancia objeto de ajax
    var oAjax = instanciarXHR(); 

    //Datos del formulario
    var sParametros = "nombre="+formularioRopas.nombreProducto.value.trim();
    sParametros += "&estado="+formularioRopas.estado.value.trim();
    sParametros += "&descripcion="+formularioRopas.descripcion.value.trim();
    sParametros += "&precio="+formularioRopas.precio.value.trim();
    sParametros += "&marca="+formularioRopas.marca.value.trim();
    sParametros += "&talla="+formularioRopas.talla.value.trim();
    sParametros += "&sexo="+formularioRopas.sexo.value.trim();
    sParametros = encodeURI(sParametros);

    //Validaciones
    var oE = window.event;
    var bValido = true;
    var sError = "";

    //Validar nombre producto
    let nombre = formularioRopas.nombreProducto.value.trim();
    var oExpReg = /^[a-zA-Z0-9\s]{3,15}$/;

    if (oExpReg.test(nombre) == false) {
        bValido = false;
        formularioProductos.nombrRopas.focus();
        sError = "El nombre de producto debe estar comprendido entre 3 y 15 caracteres";
    }

    //Validar descripcion
    let descripcion = formularioRopas.descripcion.value.trim();
    oExpReg = /^[\s\S]{0,200}$/;
    if (oExpReg.test(descripcion) == false) {
        if (bValido == true) {
            formularioRopas.descripcion.focus();
            bValido = false;
        }
        sError += "\n La descripcion debe estar comprendida entre 5 y 200 carcateres";
    }

    //Validar precio
    let precio = formularioRopas.precio.value.trim();
    oExpReg = /^[1-9]\d*(\.\d+)?$/;
    if (oExpReg.test(precio) == false) {
        if (bValido == true) {
            formularioRopas.precio.focus();
            bValido = false;
        }
        sError += "\n El precio deber ser números y el decimal separado con un punto";
    }

    //Validar marca
    let marca = formularioRopas.marca.value.trim();
    oExpReg =  /^[a-zA-Z0-9\s]{3,15}$/;
    if (oExpReg.test(marca) == false) {
        if (bValido == true) {
            formularioRopas.precio.focus();
            bValido = false;
        }
        sError += "\n La marca debe estar comprendida entre tres y 15 caracteres";
    }

    //Validar talla
    let talla = formularioRopas.talla.value.trim();
    oExpReg = /^[a-zA-Z0-9\s]{1,5}$/;
    if (oExpReg.test(talla) == false) {
        if (bValido == true) {
            formularioRopas.talla.focus();
            bValido = false;
        }
        sError += "\n La talla debe estar comprendida entre 1 y 5 caracteres";
    }

    //Mostrar errores
    if (bValido == false) {
        alert(sError);
        oE.preventDefault();
    } else {
        enviarRopa();
    }

    function enviarRopa() {
        oAjax.open("POST", encodeURI("php/altaRopas.php"));
        oAjax.addEventListener("readystatechange", respuestaInsert, false);
        oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        oAjax.send(sParametros);

        function respuestaInsert() {
            var oAjax = this;

            if (oAjax.readyState == 4 && oAjax.status == 200) {
                console.log(oAjax.responseText);
                var oRespuesta = JSON.parse(oAjax.responseText);

                if (oRespuesta.error == 0) {
                    $("#altaRopas").hide();
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