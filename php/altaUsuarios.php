<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast");
    $conexion->set_charset("utf8");

    $datos = json_decode($_POST["datos"]);

    //Comprobamos que el usuario no haya sido subido
    $sqlBusca = "SELECT email FROM usuarios WHERE email='".$datos->gmail."'";
    $resultBusca = $conexion->query($sqlBusca);
    $numLineas = $resultBusca->num_rows;
    if ($numLineas == 0) {
        //Insertamos el usuario en la base de datos
        $sqlInsert = "INSERT INTO usuarios (email, dni, nombre, apellido, direccion, nomUsuario, password)
        VALUES ('".$datos->gmail."', '".$datos->dni."', '".$datos->nombre."', '".$datos->apellidos."', '".$datos->direccion."', '".$datos->nomUsuario."', '".$datos->contraseña."')";
        $resultInsert = $conexion->query($sqlInsert);
        $respuesta["error"] = 0;
        $respuesta["mensaje"] = "El usuario ha sido registrado";
    } else {
        $respuesta["error"] = 1;
        $respuesta["mensaje"] = "Ese email ya fue registrado";
    }

    echo json_encode($respuesta);
    mysqli_close($conexion);
?>