$(document).ready(function() {
    rellenaListas();
    $("[name='btnActualizar']").click(rellenarInputs);
    $("[name='btnAceptar']").click(modificaProducto);
});


function loadXMLDocAsync(filename, callback, p) {
    let xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.addEventListener("readystatechange", () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            callback(xhttp.responseText, p);
        }
    });
    xhttp.open("GET", filename, true);
    xhttp.send();
}

function rellenaListas() {
    loadXMLDocAsync("php/getOtros.php", rellenaSelect, "#lstOtro");
}

function rellenaSelect(resultado, elemento) {
    let datos = JSON.parse(resultado);
    datos.forEach(function(e) {
        $(elemento).append("<option value='" + e.id + "'>" + e.nombre + "</option>");
    });
}

function rellenarInputs() {
    $.post("php/valoresOtro.php", $("#frmModificarOtro").serialize(), function(datos) {
        formularioOtros.modNombreProducto.value = datos.nombre;
        formularioOtros.estado.value = datos.estado;
        formularioOtros.descripcion.value = datos.descripcion;
        formularioOtros.precio.value = datos.precio;
    }, "json");
}

function modificaProducto() {
    var oAjax = instanciarXHR();

    var sParametros = "id="+frmModificarOtro.lstOtro.value.trim();
    sParametros += "&nombre="+formularioOtros.modNombreProducto.value.trim();
    sParametros += "&estado="+formularioOtros.estado.value.trim();
    sParametros += "&descripcion="+formularioOtros.descripcion.value.trim();
    sParametros += "&precio="+formularioOtros.precio.value.trim();

    //Validar
    var oE = window.event;
    var bValido = true;
    var sError = "";

    //Validar nombre producto
    let nombre = formularioOtros.modNombreProducto.value.trim();
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
        modificarOtro();
    }

    function modificarOtro() {
        oAjax.open("POST", encodeURI("php/modOtros.php"));
        oAjax.addEventListener("readystatechange", respuestaUpdate, false);
        oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        oAjax.send(sParametros);
        
        function respuestaUpdate() {
            var oAjax = this;

            if (oAjax.readyState == 4 && oAjax.status == 200) {
                console.log(oAjax.responseText);
                var oRespuesta = JSON.parse(oAjax.responseText);

                if (oRespuesta.error == 0) {
                    $("#divfrmModificarOtro").hide();
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
