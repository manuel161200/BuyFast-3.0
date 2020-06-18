<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast");
    $conexion->set_charset("utf8");

    session_start();
    $usuario = $_SESSION["email"];

    $sqlOtrosNoVen = "SELECT otros.nombre, otros.descripcion, otros.estado, otros.precio FROM otros, compras_otros WHERE otros.id_Otro=compras_otros.id_Otro AND otros.propietario='".$usuario."' AND compras_otros.email_Comprador =''";
    $resultOtrosNoVen = $conexion->query($sqlOtrosNoVen);
    $XML = '<?xml version="1.0" encoding="UTF-8"?>';
    $XML .= "<datos>"; 
    while ($fila=$resultOtrosNoVen->fetch_assoc()) {
        extract($fila);
        $XML .= "<otro>"; 
            $XML .= "<nombre>".$nombre."</nombre>";
            $XML .= "<estado>".$estado."</estado>";
            $XML .= "<descripcion>".$descripcion."</descripcion>";
            $XML .= "<precio>".$precio."</precio>";
            $XML .= "<Vendido>No</Vendido>";
        $XML .= "</otro>";
    }
    $sqlOtrosSiVen = "SELECT otros.nombre, otros.descripcion, otros.estado, otros.precio FROM otros, compras_otros WHERE otros.id_Otro=compras_otros.id_Otro AND otros.propietario='".$usuario."' AND compras_otros.email_Comprador <>''";
    $resultOtrosSiVen = $conexion->query($sqlOtrosSiVen);
    while ($fila = $resultOtrosSiVen->fetch_assoc()) {
        extract($fila);
        $XML .= "<otro>"; 
            $XML .= "<nombre>".$nombre."</nombre>";
            $XML .= "<estado>".$estado."</estado>";
            $XML .= "<descripcion>".$descripcion."</descripcion>";
            $XML .= "<precio>".$precio."</precio>";
            $XML .= "<Vendido>Si</Vendido>";
        $XML .= "</otro>";
    }
    $XML .= "</datos>";
    echo $XML;
    mysqli_close($conexion);
?>