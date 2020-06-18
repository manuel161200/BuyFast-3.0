$(document).ready(function() {
    $("[name='btnFiltrar']").click(filtrarVehiculos);
    $("[name='btnListar']").click(listarTodos);
});

function filtrarVehiculos() {
    let nombre = formularioFiltrarVehiculos.nombreProducto.value.trim();
    let estado = formularioFiltrarVehiculos.estado.value.trim();
    let minPrecio = formularioFiltrarVehiculos.minPrecio.value.trim();
    let maxPrecio = formularioFiltrarVehiculos.maxPrecio.value.trim();
    if (nombre != "" && estado != "seleccione" && minPrecio !="" && maxPrecio != "") {
        if (maxPrecio > minPrecio) {
            $("#formularios").empty()
            $.get("php/filtradoVehiculos.php", ("nombre="+nombre + "&estado="+estado + "&minPrecio="+minPrecio + "&maxPrecio="+maxPrecio), function(respuesta)  {
                $("#formularios").append(creaTabla(["Nombre", "Estado", "Descripcion", "Modelo", "Color", "Kilometros", "Precio", "Comprar"], respuesta));
            }, "xml");
        } else {
            alert("El precio máximo debe ser mayor que el precio mínimo");
        }
    } else {
        alert("Debe rellenar todos los datos");
    }
}

function listarTodos() {
    $("#formularios").empty();
    $.get("php/disponiblesVehiculos.php", function(respuesta) {
        $("#formularios").append(creaTabla(["Nombre", "Estado", "Descripcion", "Modelo", "Color", "Kilometros", "Precio", "Comprar"], respuesta));
    }, "xml");
}

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
    let btnComprar = document.createElement("input");
    btnComprar.setAttribute("type", "button");
    btnComprar.setAttribute("id", "btnComprar");
    btnComprar.setAttribute("value", "Comprar");
    btnComprar.classList.add("btn");
    btnComprar.classList.add("btn-info");
    let btnComprarClonado = null;
    let contador = 0;
    let cuerpo = document.createElement("tbody");
    xml.querySelectorAll("vehiculo").forEach(elem => {
        let fila = cuerpo.insertRow(-1);
        let celda = fila.insertCell(-1);
        celda.append(elem.querySelector("nombre").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("estado").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("descripcion").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("modelo").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("color").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("kms").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("precio").textContent);
        celda = fila.insertCell(-1);
        btnComprarClonado = btnComprar.cloneNode(true);
        btnComprarClonado.id = btnComprarClonado.id+contador;
        contador++;
        btnComprarClonado.dataset.id_producto = elem.querySelector("id").textContent;
        celda.append(btnComprarClonado);
        btnComprarClonado.addEventListener("click",comprarProducto,false);
    });
    tabla.append(cuerpo);
    let linea = tabla.insertRow(-1);
    let celda = linea.insertCell(-1);
    celda.setAttribute("colspan", "8");
    return tabla;
}

function comprarProducto(oEvento) {
    let oE = oEvento || window.event;
    let id = oE.currentTarget.dataset.id_producto;
    $.post("php/ComprarVehiculo.php", ("id="+id), function(respuesta) {
        alert(respuesta.mensaje);
        if (respuesta.error == 0) {
            $("#formularios").empty();
        }
    }, "json");
}
