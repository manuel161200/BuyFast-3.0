<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast");
    $conexion->set_charset("utf8");

    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $estado = $_POST["estado"];
    $descripcion = $_POST["descripcion"];
    $precio = $_POST["precio"];
    $modelo = $_POST["modelo"];
    $color = $_POST["color"];
    $kms = $_POST["kms"];

    $modProducto = "UPDATE vehiculos SET nombre = '".$nombre."', estado = '".$estado."',descripcion = '".$descripcion."',precio = '".$precio."',modelo = '".$modelo."',color = '".$color."',kms = '".$kms."' WHERE id_Vehiculo='".$id."'";
    $resultProducto = $conexion->query($modProducto);
    
    if ($resultProducto) {
        $respuesta["error"] = 0;
        $respuesta["mensaje"] = "Producto modificado correctamente"; 
    } else {
        $respuesta["error"] = 1;
        $respuesta["mensaje"] = "Error al modificar el producto";
    }
    echo json_encode($respuesta); 
    mysqli_close($conexion);
?>