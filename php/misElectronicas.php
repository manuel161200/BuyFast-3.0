<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast");
    $conexion->set_charset("utf8");

    session_start();
    $usuario = $_SESSION["email"];

    $sqlElectronicasNoVen = "SELECT electronicas.nombre, electronicas.estado, electronicas.descripcion, electronicas.precio, electronicas.modelo, electronicas.tipo FROM electronicas, compras_electronica WHERE electronicas.id_Electronica=compras_electronica.id_Electronica AND electronicas.propietario='".$usuario."' AND compras_electronica.email_Comprador =''";
    $resultElectronicasNoVen = $conexion->query($sqlElectronicasNoVen);
    $XML = '<?xml version="1.0" encoding="UTF-8"?>';
    $XML .= "<datos>"; 
    while ($fila=$resultElectronicasNoVen->fetch_assoc()) {
        extract($fila);
        $XML .= "<electronica>"; 
            $XML .= "<nombre>".$nombre."</nombre>";
            $XML .= "<estado>".$estado."</estado>";
            $XML .= "<descripcion>".$descripcion."</descripcion>";
            $XML .= "<precio>".$precio."</precio>";
            $XML .= "<modelo>".$modelo."</modelo>";
            $XML .= "<tipo>".$tipo."</tipo>";
            $XML .= "<Vendido>No</Vendido>";
        $XML .= "</electronica>";
    }
    $sqlElectronicasSiVen = "SELECT electronicas.nombre, electronicas.estado, electronicas.descripcion, electronicas.precio, electronicas.modelo, electronicas.tipo FROM electronicas, compras_electronica WHERE electronicas.id_Electronica=compras_electronica.id_Electronica AND electronicas.propietario='".$usuario."' AND compras_electronica.email_Comprador <>''";
    $resultElectronicasSiVen = $conexion->query($sqlElectronicasSiVen);
    while ($fila=$resultElectronicasSiVen->fetch_assoc()) {
        extract($fila);
        $XML .= "<electronica>"; 
            $XML .= "<nombre>".$nombre."</nombre>";
            $XML .= "<estado>".$estado."</estado>";
            $XML .= "<descripcion>".$descripcion."</descripcion>";
            $XML .= "<precio>".$precio."</precio>";
            $XML .= "<modelo>".$modelo."</modelo>";
            $XML .= "<tipo>".$tipo."</tipo>";
            $XML .= "<Vendido>Si</Vendido>";
        $XML .= "</electronica>";
    }
    $XML .= "</datos>";
    echo $XML;
    mysqli_close($conexion);
?>