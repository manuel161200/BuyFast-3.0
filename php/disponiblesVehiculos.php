<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast");
    $conexion->set_charset("utf8");

    session_start();
    $usuario = $_SESSION["email"];

    $sql = "SELECT vehiculos.id_Vehiculo, vehiculos.nombre, vehiculos.estado, vehiculos.descripcion, vehiculos.precio, vehiculos.modelo, vehiculos.color, vehiculos.kms FROM vehiculos, compras_vehiculo WHERE vehiculos.id_Vehiculo=compras_vehiculo.id_Vehiculo AND vehiculos.propietario <> '".$usuario."' AND compras_vehiculo.email_Comprador=''";
    $resultado = $conexion->query($sql);
    $XML = '<?xml version="1.0" encoding="UTF-8"?>';
    $XML .= "<datos>"; 
    while ($fila=$resultado->fetch_assoc()) {
        extract($fila);
        $XML .= "<vehiculo>"; 
            $XML .= "<id>".$id_Vehiculo."</id>";
            $XML .= "<nombre>".$nombre."</nombre>";
            $XML .= "<estado>".$estado."</estado>";
            $XML .= "<descripcion>".$descripcion."</descripcion>";
            $XML .= "<precio>".$precio."</precio>";
            $XML .= "<modelo>".$modelo."</modelo>";
            $XML .= "<color>".$color."</color>";
            $XML .= "<kms>".$kms."</kms>";
        $XML .= "</vehiculo>";
    }
    $XML .= "</datos>";
    echo $XML;
    mysqli_close($conexion);
?>