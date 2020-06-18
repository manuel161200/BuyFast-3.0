$(document).ready(function() {
    $("[name='btnAceptar']").click(validaAltaUsuario);
});

function validaAltaUsuario() {
    let datos = {
        dni: $("[name='DNI']").val(),
        nombre: $("[name='nombre']").val(),
        apellidos: $("[name='apellidos']").val(),
        gmail: $("[name='gmail']").val(),
        direccion: $("[name='direccion']").val(),
        nomUsuario: $("[name='nomUsuario']").val(),
        contraseña: $("[name='contraseña']").val()
    }

    if (datos.dni != "" && datos.nombre != "" && datos.apellidos != "" && datos.gmail != "" && datos.direccion != "" && datos.nomUsuario != "" && datos.contraseña != "") {
        var oE = window.event;
        var bValido = true;
        var sError = "";

        //Validar Dni
        
        var oExpReg = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;

        if (oExpReg.test(datos.dni) == false) {
            bValido = false;
            sError = "El DNi debe estar compues por 8 dígitos y una letra";
        }

        //Validar nombre
        
        oExpReg = /[/sa-zA-Z]{3,20}/;

        if (oExpReg.test(datos.nombre) == false) {
            if (bValido == true) {
                bValido = false;
            }   
            sError += "\n El nombre debe ser alfabetico entre 3 y 20 caracteres";
        }

        //Validar apellido
        oExpReg = /[/sa-zA-Z]{5,40}/;

        if (oExpReg.test(datos.apellidos) == false) {
            if (bValido == true) {
                bValido = false;
            }
            sError += "\n El apellido deber ser alfabetico entre 5 y 40 caracteres";
        }

        //Validar gmail
        oExpReg = /^[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}$/;

        if (oExpReg.test(datos.gmail) == false) {
            if (bValido == true) {
                bValido = false;
            }
            sError += "\n El email es incorrecto";
        }

        //Validar direccion

        oExpReg = /^[a-zA-Z0-9\s]{5,60}$/;

        if (oExpReg.test(datos.direccion) == false) {
            if (bValido == true) {
                bValido = false;
            }
            sError += "\n La direccion tienes que estar comprendida entre 5 y 60 casracteres";
        }

        //Validar nombre de usuario 

        oExpReg = /^[a-z\d_]{4,15}$/i;

        if (oExpReg.test(datos.nomUsuario) == false) {
            if (bValido == true) {
                bValido = false;
            }
            sError += "\n El nombre de usuario tiene que estar comprendido entre 4 y 15 caracteres";
        }

        //Validar contraseña

        oExpReg =  /(?=^.{5,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/; 

        if (oExpReg.test(datos.contraseña) == false) {
            if (bValido == true) {
                bValido = false;
            }
            sError += "\n La contraseña tiene que tener como mínimo 5 caracteres un caracter especila y un número";
        }

        //Mostrar errores
        if (bValido == false) {
        alert(sError);
        oE.preventDefault();
        } else {
        enviarAlta();
        }

        function enviarAlta() {
            $.ajax({
                method: "POST",
                async: true,
                url: "php/altaUsuarios.php",
                data: "datos=" + JSON.stringify(datos),
                dataType: "json"
            }).done((json) => {
                alert(json.mensaje);
                if (json.error == 0) {
                    $("#form").hide();
                }
            });

        }
    } else {
        alert("Rellene todos los campos");
    }
}