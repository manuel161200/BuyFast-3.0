<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast");
    $conexion->set_charset("utf8");

    $datos = json_decode($_POST["datos"]);

    //Valido el nombre y la contraseña
    $sqlValidar = "SELECT email FROM usuarios WHERE nomUsuario='".$datos->nomUsuario."' AND password='".$datos->contraseña."'";
    $resultValidar = $conexion->query($sqlValidar);
    $numLineas = $resultValidar->num_rows;
    if ($numLineas != 0) {
        $respuesta["error"] = 0;
        $respuesta["mensaje"] = "Login correcto";
    } else {
        $respuesta["error"] = 1;
        $respuesta["mensaje"] = "Nombre de usuario o contraseña incorrectos";
    }

    //Para saber cual ha sido el usuario logeado en productos creo una sesion
    session_start();

    if ($fila=$resultValidar->fetch_assoc()) {
        extract($fila);
        $_SESSION["email"] = $email;
    }

    echo json_encode($respuesta);
    
?>