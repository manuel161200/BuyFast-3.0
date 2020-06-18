//# sourceURL=alta_asignacion.js

$(document).ready(function() {
    rellenaListas();
    $("[name='btnAceptarEliminacion']").click(insertaAsignacion);
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
    loadXMLDocAsync("php/getElectronicas.php", rellenaSelect, "#lstElectronica");
}

function rellenaSelect(resultado, elemento) {
    let datos = JSON.parse(resultado);
    datos.forEach(function(e) {
        $(elemento).append("<option value='" + e.id + "'>" + e.nombre + "</option>");
    });
}

function insertaAsignacion() {
    $.post("php/eliminarElectronicas.php", $("#frmEliminarElectronica").serialize(), function(respuesta) {
        alert(respuesta.mensaje);
        if (respuesta.error == 0) {
            $("#divfrmEliminarElectronica").hide();
        }
    }, "json");
}