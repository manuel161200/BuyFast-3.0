<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast");
    $conexion->set_charset("utf8");

    session_start();
    $usuario = $_SESSION["email"];

    $id = $_POST["id"];

    $sqlCompra = "UPDATE compras_Electronica SET email_Comprador='".$usuario."' WHERE id_Electronica='".$id."'";
    $resultCompra = $conexion->query($sqlCompra);

    if($resultCompra) {
        $respuesta["error"] = 0;
        $respuesta["mensaje"] = "Producto comprado con exito";
    } else {
        $respuesta["error"] = 1;
        $respuesta["mensaje"] = "Error al comprar el producto";
    }

    echo json_encode($respuesta);
?>