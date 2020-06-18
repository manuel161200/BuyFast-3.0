$(document).ready(function() {
    $("[name='btnAceptar']").click(validaLogin);
});

function validaLogin() {
    let datos = {
        nomUsuario: $("[name='nomUsuario']").val(),
        contraseña: $("[name='contraseña']").val()
    }
    if (datos.nomUsuario != "" && datos.contraseña != "") {
        $.ajax({
            method: "POST",
            async: true,
            url: "php/loginUsuarios.php",
            data: "datos=" + JSON.stringify(datos),
            dataType: "json"
        }).done((json) => {
            alert(json.mensaje);
            if (json.error == 0) {
                window.location="productos.html";
            }
        });
    } else {
        alert("Rellene todos los campos");
    }
}