

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
    loadXMLDocAsync("php/getVehiculos.php", rellenaSelect, "#lstVehiculo");
}

function rellenaSelect(resultado, elemento) {
    let datos = JSON.parse(resultado);
    datos.forEach(function(e) {
        $(elemento).append("<option value='" + e.id + "'>" + e.nombre + "</option>");
    });
}

function insertaAsignacion() {
    $.post("php/eliminarVehiculos.php", $("#frmEliminarVehiculo").serialize(), function(respuesta) {
        alert(respuesta.mensaje);
        if (respuesta.error == 0) {
            $("#divfrmEliminarVehiculo").hide();
        }
    }, "json");
}