<?php

$conexion = mysqli_connect("localhost", "root", "", "buyfast") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

// Consulta SQL para obtener los datos de los centros.
$sqlVehiculo = "DELETE FROM otros WHERE id_Otro='".$_POST["lstOtro"]."'";
$resultadoVehiculo = mysqli_query($conexion,$sqlVehiculo) or die(mysqli_error($conexion));

$sqlCompras = "DELETE FROM compras_Otros WHERE id_Otro='".$_POST["lstOtro"]."'";
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