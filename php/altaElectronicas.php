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
    $tipo = $_POST["tipo"];

    //Comprobamos que ese producto no haya sido subido ya por el usuario
    $usuario = $_SESSION["email"];
    $sqlBusca = "SELECT id_Electronica FROM electronicas WHERE nombre='".$nombre."' AND propietario='".$usuario."'";
    $resultBusca = $conexion->query($sqlBusca);
    $numLineas = $resultBusca->num_rows;
    if ($numLineas == 0) {
        //Insertamos el producto en productos, vehiculos y compras
        $sqlInsertProd = "INSERT INTO electronicas (id_Electronica, nombre, estado, descripcion, precio, propietario, modelo, tipo)";
        $sqlInsertProd .= " VALUES ('', '".$nombre."', '".$estado."', '".$descripcion."', '".$precio."', '".$usuario."', '".$modelo."', '".$tipo."')";
        $resultInsert = $conexion->query($sqlInsertProd);
        //Ahora cojemos el id de ese producto para añadirlo a vehiculos y compra
        $sqlId = "SELECT MAX(id_Electronica) AS id FROM electronicas";
        $resultId = $conexion->query($sqlId);
        while ($fila=$resultId->fetch_assoc()) {
            extract($fila);
            $sqlInsertCompra = "INSERT INTO compras_Electronica (email_Comprador, email_Vendedor, id_Electronica) VALUES ('', '".$usuario."', '".$id."')";
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