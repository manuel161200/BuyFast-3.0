<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast");
    $conexion->set_charset("utf8");

    session_start();
    $usuario = $_SESSION["email"];
    
    $sqlVehiculosNoVen = "SELECT vehiculos.nombre, estado, vehiculos.descripcion, vehiculos.precio, vehiculos.modelo, vehiculos.color, vehiculos.kms FROM vehiculos, compras_Vehiculo WHERE vehiculos.id_Vehiculo = compras_Vehiculo.id_Vehiculo AND vehiculos.propietario='".$usuario."' AND compras_Vehiculo.email_Comprador = ''";
    $resultVehiculosNoVen = $conexion->query($sqlVehiculosNoVen);
    $XML = '<?xml version="1.0" encoding="UTF-8"?>';
    $XML .= "<datos>"; 
    while ($fila = $resultVehiculosNoVen->fetch_assoc()) {
        extract($fila);
        $XML .= "<vehiculo>"; 
            $XML .= "<nombre>".$nombre."</nombre>";
            $XML .= "<estado>".$estado."</estado>";
            $XML .= "<descripcion>".$descripcion."</descripcion>";
            $XML .= "<precio>".$precio."</precio>";
            $XML .= "<modelo>".$modelo."</modelo>";
            $XML .= "<color>".$color."</color>";
            $XML .= "<kms>".$kms."</kms>";
            $XML .= "<Vendido>No</Vendido>";
        $XML .= "</vehiculo>";
    }
    $sqlVehiculosSiVen = "SELECT vehiculos.nombre, estado, vehiculos.descripcion, vehiculos.precio, vehiculos.modelo, vehiculos.color, vehiculos.kms FROM vehiculos, compras_Vehiculo WHERE vehiculos.id_Vehiculo = compras_Vehiculo.id_Vehiculo AND vehiculos.propietario='".$usuario."' AND compras_Vehiculo.email_Comprador <> ''";
    $resultVehiculosSiVen = $conexion->query($sqlVehiculosSiVen);
    while ($fila = $resultVehiculosSiVen->fetch_assoc()) {
        extract($fila);
        $XML .= "<vehiculo>"; 
            $XML .= "<nombre>".$nombre."</nombre>";
            $XML .= "<estado>".$estado."</estado>";
            $XML .= "<descripcion>".$descripcion."</descripcion>";
            $XML .= "<precio>".$precio."</precio>";
            $XML .= "<modelo>".$modelo."</modelo>";
            $XML .= "<color>".$color."</color>";
            $XML .= "<kms>".$kms."</kms>";
            $XML .= "<Vendido>Si</Vendido>";
        $XML .= "</vehiculo>";
    }
    $XML .= "</datos>";
    echo $XML;
    mysqli_close($conexion);
?>