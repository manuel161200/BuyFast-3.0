<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast");
    $conexion->set_charset("utf8");

    session_start();

    //Datos
    $nombre = $_POST["nombre"];
    $estado = $_POST["estado"];
    $descripcion = $_POST["descripcion"];
    $precio = $_POST["precio"];

    //Comprobamos que ese producto no haya sido subido ya por el usuario
    $usuario = $_SESSION["email"];
    $sqlBusca = "SELECT id_Otro FROM otros WHERE nombre='".$nombre."' AND propietario='".$usuario."'";
    $resultBusca = $conexion->query($sqlBusca);
    $numLineas = $resultBusca->num_rows;
    if ($numLineas == 0) {
        //Insertamos el producto en productos, vehiculos y compras
        $sqlInsertProd = "INSERT INTO otros (id_Otro, nombre, estado, descripcion, precio, propietario)";
        $sqlInsertProd .= " VALUES ('', '".$nombre."', '".$estado."', '".$descripcion."', '".$precio."', '".$usuario."')";
        $resultInsert = $conexion->query($sqlInsertProd);
        //Ahora cojemos el id de ese producto para añadirlo a vehiculos y compra
        $sqlId = "SELECT MAX(id_Otro) AS id FROM otros";
        $resultId = $conexion->query($sqlId);
        while ($fila=$resultId->fetch_assoc()) {
            extract($fila);
            $sqlInsertCompra = "INSERT INTO compras_Otros (email_Comprador, email_Vendedor, id_Otro) VALUES ('', '".$usuario."', '".$id."')";
            $resultInsertCompra = $conexion->query($sqlInsertCompra);
        }
        $respuesta["error"] = 0;
        $respuesta["mensaje"] = "El producto ha sido subido";
    } else {
        $respuesta["error"] = 1;
        $respuesta["mensaje"] = "Ese producto ya ha sido subido";
    }

    echo json_encode($respuesta);
    mysqli_close($conexion);
?>