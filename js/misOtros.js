$(document).ready(function () {
    $("#formularios").empty();
    $.get("php/misOtros.php", function(respuesta) {
        $("#formularios").append(creaTabla(["Nombre", "Estado", "Descripcion", "Precio", "Vendido"], respuesta));
    }, "xml");
});

function creaTabla(headers, xml) {
    let tabla = document.createElement("table");
    tabla.classList.add("table");
    tabla.classList.add("table-bordered");
    tabla.classList.add("table-hover");
    tabla.classList.add("mt-5");
    tabla.classList.add("w-75");
    tabla.classList.add("mx-auto");
    let header = tabla.createTHead();
    let encabezados = header.insertRow(-1);
    headers.forEach(encabezado => {
        let celda = encabezados.insertCell(-1);
        celda.textContent = encabezado;
        celda.setAttribute("style", "font-weight: bold");
        encabezados.append(celda);
    });
    let cuerpo = document.createElement("tbody");
    xml.querySelectorAll("otro").forEach(elem => {
        let fila = cuerpo.insertRow(-1);
        let celda = fila.insertCell(-1);
        celda.append(elem.querySelector("nombre").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("estado").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("descripcion").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("precio").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("Vendido").textContent);
    });
    tabla.append(cuerpo);
    let linea = tabla.insertRow(-1);
    let celda = linea.insertCell(-1);
    celda.setAttribute("colspan", "5");
    return tabla;
}