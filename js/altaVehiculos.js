"use strict";
formularioVehiculos.btnAceptar.addEventListener("click", validaFormulario);

function validaFormulario() {
    //Instancia objeto de ajax
    var oAjax = instanciarXHR(); 

    //Datos del formulario
    var sParametros = "nombre="+formularioVehiculos.nombreProducto.value.trim();
    sParametros += "&estado="+formularioVehiculos.estado.value.trim();
    sParametros += "&descripcion="+formularioVehiculos.descripcion.value.trim();
    sParametros += "&precio="+formularioVehiculos.precio.value.trim();
    sParametros += "&modelo="+formularioVehiculos.modelo.value.trim();
    sParametros += "&color="+formularioVehiculos.color.value.trim();
    sParametros += "&kms="+formularioVehiculos.kms.value.trim();
    sParametros = encodeURI(sParametros);

    var oE = window.event;
    var bValido = true;
    var sError = "";

    //Validar nombre producto
    let nombre = formularioVehiculos.nombreProducto.value.trim();
    var oExpReg = /^[a-zA-Z0-9\s]{3,15}$/;

    if (oExpReg.test(nombre) == false) {
        bValido = false;
        formularioVehiculos.nombreProducto.focus();
        sError = "El nombre de producto debe estar comprendido entre 3 y 15 caracteres";
    }

    //Validar descripcion
    let descripcion = formularioVehiculos.descripcion.value.trim();
    oExpReg = /^[\s\S]{0,200}$/;
    if (oExpReg.test(descripcion) == false) {
        if (bValido == true) {
            formularioVehiculos.descripcion.focus();
            bValido = false;
        }
        sError += "\n La descripcion debe estar comprendida entre 5 y 200 carcateres";
    }

    //Validar precio
    let precio = formularioVehiculos.precio.value.trim();
    oExpReg = /^[1-9]\d*(\.\d+)?$/;
    if (oExpReg.test(precio) == false) {
        if (bValido == true) {
            formularioVehiculos.precio.focus();
            bValido = false;
        }
        sError += "\n El precio deber ser números y el decimal separado con un punto";
    }

    //Validar modelo
    let modelo = formularioVehiculos.modelo.value.trim();
    oExpReg = /^[a-zA-Z0-9\s]{3,15}$/;
    if (oExpReg.test(modelo) == false) {
        if (bValido == true) {
            formularioVehiculos.modelo.focus();
            bValido = false;
        }
        sError += "\n El modelo debe ser entre 3 y 15 caracteres";
    }
    
    //Validar color 
    let color = formularioVehiculos.color.value.trim();
    oExpReg = /^[a-zA-Z0-9\s]{3,10}$/;
    if (oExpReg.test(color) == false) {
        if (bValido == true) {
            formularioVehiculos.color.focus();
            bValido = false;
        }
        sError += "\n El color debe estar comprendido entre 3 y 10 caracteres";
    }

    //Validar kms
    let kms = formularioVehiculos.kms.value.trim();
    oExpReg = /^([0-9])*$/;
    if (oExpReg.test(kms) == false) {
        if (bValido == true) {
            formularioVehiculos.kms.focus();
            bValido = false;
        }
        sError += "\n Los kilometros deben ser números";
    }

    //Mostrar errores
    if (bValido == false) {
        alert(sError);
        oE.preventDefault();
    } else {
        enviarVehiculos();
    }

    function enviarVehiculos() {
        oAjax.open("POST", encodeURI("php/altaVehiculos.php"));
        oAjax.addEventListener("readystatechange", respuestaInsert, false);
        oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        oAjax.send(sParametros);

        function respuestaInsert() {
            var oAjax = this;

            if (oAjax.readyState == 4 && oAjax.status == 200) {
                console.log(oAjax.responseText);
                var oRespuesta = JSON.parse(oAjax.responseText);

                if (oRespuesta.error == 0) {
                    $("#altaVehiculos").hide();
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