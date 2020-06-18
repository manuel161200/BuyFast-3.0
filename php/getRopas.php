<?php

$conexion = mysqli_connect("localhost", "root", "", "buyfast") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

session_start();
$usuario = $_SESSION["email"];

// Consulta SQL para obtener los datos de los centros.
$sql = "select id_Ropa as id, nombre from ropas where propietario = '".$usuario."'";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
$datos = [];

while ($fila = mysqli_fetch_assoc($resultados)) {
    // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
    $datos[] = $fila;
}

// función de PHP que convierte a formato JSON el array.
echo json_encode($datos); 

mysqli_close($conexion);
?>