<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast");
    $conexion->set_charset("utf8");

    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $estado = $_POST["estado"];
    $descripcion = $_POST["descripcion"];
    $precio = $_POST["precio"];
    $marca = $_POST["marca"];
    $talla = $_POST["talla"];
    $sexo = $_POST["sexo"];

    $modProducto = "UPDATE ropas SET nombre = '".$nombre."', estado = '".$estado."',descripcion = '".$descripcion."',precio = '".$precio."',marca = '".$marca."',talla = '".$talla."',sexo = '".$sexo."' WHERE id_Ropa='".$id."'";
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