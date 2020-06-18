<?php

$conexion = mysqli_connect("localhost", "root", "", "buyfast") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");



// Consulta SQL para obtener los datos de los centros.
$sql = "select nombre, estado, descripcion, precio, modelo, color, kms FROM vehiculos WHERE id_Vehiculo='".$_POST["lstVehiculo"]."'";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
$datos = [];

while ($fila = mysqli_fetch_assoc($resultados)) {
    // Almacenamos en un array cada una de las filas que vamos leyendo
    extract($fila);
    $datos["nombre"] = $nombre;
    $datos["estado"] = $estado;
    $datos["descripcion"] = $descripcion;
    $datos["precio"] = $precio;
    $datos["modelo"] = $modelo;
    $datos["color"] = $color;
    $datos["kms"] = $kms;
}

// función de PHP que convierte a formato JSON el array.
echo json_encode($datos); 

mysqli_close($conexion);
?>