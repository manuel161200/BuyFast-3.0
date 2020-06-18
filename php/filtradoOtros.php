<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast");
    $conexion->set_charset("utf8");

    session_start();
    $usuario = $_SESSION["email"];

    $nombre = $_GET["nombre"];
    $estado = $_GET["estado"];
    $minPrecio = $_GET["minPrecio"];
    $maxPrecio = $_GET["maxPrecio"];


    $sqlOtrosNoVen = "SELECT otros.id_Otro, otros.nombre, otros.descripcion, otros.estado, otros.precio FROM otros, compras_otros WHERE otros.id_Otro=compras_otros.id_Otro AND otros.propietario<>'".$usuario."' AND compras_otros.email_Comprador ='' AND otros.nombre LIKE '%".$nombre."%' AND otros.estado='".$estado."' AND otros.precio > ".$minPrecio." AND otros.precio < ".$maxPrecio."";
    $resultOtrosNoVen = $conexion->query($sqlOtrosNoVen);
    $XML = '<?xml version="1.0" encoding="UTF-8"?>';
    $XML .= "<datos>"; 
    while ($fila=$resultOtrosNoVen->fetch_assoc()) {
        extract($fila);
        $XML .= "<otro>"; 
            $XML .= "<id>".$id_Otro."</id>";
            $XML .= "<nombre>".$nombre."</nombre>";
            $XML .= "<estado>".$estado."</estado>";
            $XML .= "<descripcion>".$descripcion."</descripcion>";
            $XML .= "<precio>".$precio."</precio>";
        $XML .= "</otro>";
    }
    $XML .= "</datos>";
    echo $XML;
    mysqli_close($conexion);
?>