<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast");
    $conexion->set_charset("utf8");

    session_start();
    $usuario = $_SESSION["email"];

    $nombre = $_GET["nombre"];
    $estado = $_GET["estado"];
    $minPrecio = $_GET["minPrecio"];
    $maxPrecio = $_GET["maxPrecio"];
    
    $sqlVehiculosNoVen = "SELECT ropas.id_Ropa, ropas.nombre, ropas.descripcion, ropas.estado, ropas.precio, ropas.marca, ropas.talla, ropas.sexo FROM ropas, compras_ropa WHERE ropas.id_Ropa=compras_ropa.id_Ropa AND ropas.propietario <> '".$usuario."' AND compras_ropa.email_Comprador ='' AND ropas.nombre LIKE '%".$nombre."%' AND ropas.estado='".$estado."' AND ropas.precio > ".$minPrecio." AND ropas.precio < ".$maxPrecio."";
    $resultVehiculosNoVen = $conexion->query($sqlVehiculosNoVen);
    $XML = '<?xml version="1.0" encoding="UTF-8"?>';
    $XML .= "<datos>"; 
    while ($fila = $resultVehiculosNoVen->fetch_assoc()) {
        extract($fila);
        $XML .= "<ropa>"; 
            $XML .= "<id>".$id_Ropa."</id>";
            $XML .= "<nombre>".$nombre."</nombre>";
            $XML .= "<estado>".$estado."</estado>";
            $XML .= "<descripcion>".$descripcion."</descripcion>";
            $XML .= "<precio>".$precio."</precio>";
            $XML .= "<marca>".$marca."</marca>";
            $XML .= "<talla>".$talla."</talla>";
            $XML .= "<sexo>".$sexo."</sexo>";
            $XML .= "<Vendido>No</Vendido>";
        $XML .= "</ropa>";
    }
    $XML .= "</datos>";
    echo $XML;
    mysqli_close($conexion);
?>