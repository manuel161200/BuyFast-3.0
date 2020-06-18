<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast");
    $conexion->set_charset("utf8");

    session_start();

    //Datos
    $nombre = $_POST["nombre"];
    $estado = $_POST["estado"];
    $descripcion = $_POST["descripcion"];
    $precio = $_POST["precio"];
    $modelo = $_POST["modelo"];
    $color = $_POST["color"];
    $kms = $_POST["kms"];

    //Comprobamos que ese producto no haya sido subido ya por el usuario
    $usuario = $_SESSION["email"];
    $sqlBusca = "SELECT id_Vehiculo FROM vehiculos WHERE nombre='".$nombre."' AND propietario='".$usuario."'";
    $resultBusca = $conexion->query($sqlBusca);
    $numLineas = $resultBusca->num_rows;
    if ($numLineas == 0) {
        //Insertamos el producto en productos, vehiculos y compras
        $sqlInsertProd = "INSERT INTO vehiculos (id_Vehiculo, nombre, estado, descripcion, precio, propietario, modelo, color, kms)";
        $sqlInsertProd .= " VALUES ('', '".$nombre."', '".$estado."', '".$descripcion."', '".$precio."', '".$usuario."', '".$modelo."', '".$color."', '".$kms."')";
        $resultInsert = $conexion->query($sqlInsertProd);
        //Ahora cojemos el id de ese producto para añadirlo a vehiculos y compra
        $sqlId = "SELECT MAX(id_Vehiculo) AS id FROM vehiculos";
        $resultId = $conexion->query($sqlId);
        while ($fila=$resultId->fetch_assoc()) {
            extract($fila);
            $sqlInsertCompra = "INSERT INTO compras_Vehiculo (email_Comprador, email_Vendedor, id_Vehiculo) VALUES ('', '".$usuario."', '".$id."')";
            $resultInsertCompra = $conexion->query($sqlInsertCompra);
        }
        $respuesta["error"] = 0;
        $respuesta["mensaje"] = "El vehiculo ha sido subido";
    } else {
        $respuesta["error"] = 1;
        $respuesta["mensaje"] = "Ese producto ya ha sido subido";
    }

    echo json_encode($respuesta);
    mysqli_close($conexion);
?>