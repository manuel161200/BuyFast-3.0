<?php

$conexion = mysqli_connect("localhost", "root", "", "buyfast") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

// Consulta SQL para obtener los datos de los centros.
$sqlVehiculo = "DELETE FROM electronicas WHERE id_Electronica='".$_POST["lstElectronica"]."'";
$resultadoVehiculo = mysqli_query($conexion,$sqlVehiculo) or die(mysqli_error($conexion));

$sqlCompras = "DELETE FROM compras_Electronica WHERE id_Electronica='".$_POST["lstElectronica"]."'";
$resultadoCompras = mysqli_query($conexion,$sqlCompras) or die(mysqli_error($conexion));

if ($resultadoVehiculo && $resultadoCompras){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Producto eliminado correctamente"; 
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de eliminacion: ".mysqli_error($conexion);
}

// función de PHP que convierte a formato JSON el array.
echo json_encode($respuesta); 

mysqli_close($conexion);
?>