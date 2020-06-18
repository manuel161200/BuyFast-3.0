
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- Creo la base de datos buyfast

drop database if exists buyfast;
create database buyfast;
use buyfast;

-- Tabla usuarios
CREATE TABLE usuarios (
    email CHAR(40) NOT NULL,
    PRIMARY KEY(email),
    dni CHAR (9),
    nombre CHAR(20),
    apellido CHAR(20),
    direccion CHAR(30),
    nomUsuario CHAR(20),
    password CHAR(20)
);

-- Creo el contenido de la tabla
INSERT INTO usuarios (email, dni, nombre, apellido, direccion, nomUsuario, password) VALUES
('maria@gmail.com', '22222222D', 'Maria', 'Rodriguez', 'C/Europa 16', 'mariaRO22', 'mariaRO22'),
('pepe@gmail.com', '44444444P', 'Pepe', 'Valencia', 'C/Alberto 22', 'pepeVA44', 'pepeVA44');

-- -- Tabla productos
-- CREATE TABLE productos (
--     id_Producto CHAR(20) NOT NULL,
--     PRIMARY KEY(id_Producto),
--     nombre CHAR(20),
--     estado CHAR(20),
--     descripcion CHAR(255),
--     precio CHAR(20),
--     propietario CHAR(40)
-- );

-- INSERT INTO productos (id_Producto, nombre, estado, descripcion, precio, propietario) VALUES
-- ('1', 'Seat', 'Bueno', 'Vehiculo en buen estado sin ninguna averia', '1000', 'maria@gmail.com'),
-- ('2', 'Renault', 'Roto', 'Necesita reparaciones', '500', 'pepe@gmail.com'),
-- ('3', 'Camiseta', 'Sin abrir', 'Aun tienen la etiqueta puesta', '20', 'maria@gmail.com'),
-- ('4', 'Pantalon', 'Como Nuevo', 'Lo he usado un par de veces pero esta en perfecto estado', '15', 'maria@gmail.com'),
-- ('5', 'Portatil pavilion', 'Bueno', 'Ordenador portatil con muy poco tiempo de uso', '100', 'pepe@gmail.com'),
-- ('6', 'Iphone 7', 'Roto', 'Movil con la pantalla rota por lo demas esta bien', '70', 'pepe@gmail.com'),
-- ('7', 'Mesa', 'Aceptable', 'Mesa de escritorio bastante grande', '25', 'maria@gmail.com'),
-- ('8', 'Sofa', 'Como Nuevo', 'Sofa bastante grande caben hasta 5 personas', '50', 'pepe@gmail.com');

-- -- Auto_Increment para la tabla productos
-- ALTER TABLE `productos`
--   MODIFY `id_Producto` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

-- Tabla Vehiculos
CREATE TABLE vehiculos (
    id_Vehiculo CHAR(20) NOT NULL,
    PRIMARY KEY(id_Vehiculo),
    nombre CHAR(20),
    estado CHAR(20),
    descripcion CHAR(255),
    precio CHAR(20),
    propietario CHAR(40),
    modelo CHAR(20),
    color CHAR(20),
    kms CHAR(20)
);

INSERT INTO vehiculos (id_Vehiculo, nombre, estado, descripcion, precio, propietario ,modelo, color, kms) VALUES
('1', 'Seat', 'Bueno', 'Vehiculo en buen estado sin ninguna averia', '1000', 'maria@gmail.com', 'Ibiza', 'Rojo', '20000'),
('2', 'Renault', 'Roto', 'Necesita reparaciones', '500', 'pepe@gmail.com', 'Clio', 'Blanco', '40000');

-- Auto_Increment para la tabla vehiculos
ALTER TABLE `vehiculos`
  MODIFY `id_Vehiculo` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

-- Tabla ropas
CREATE TABLE ropas (
    id_Ropa CHAR(20) NOT NULL,
    PRIMARY KEY(id_Ropa),
    nombre CHAR(20),
    estado CHAR(20),
    descripcion CHAR(255),
    precio CHAR(20),
    propietario CHAR(40),
    marca CHAR(20),
    talla CHAR(20),
    sexo CHAr(20)
);

INSERT INTO ropas (id_Ropa, nombre, estado, descripcion, precio, propietario, marca, talla, sexo) VALUES
('3', 'Camiseta', 'Sin abrir', 'Aun tienen la etiqueta puesta', '20', 'maria@gmail.com', 'Nike', 'M', 'Hombre'),
('4', 'Pantalon', 'Como Nuevo', 'Lo he usado un par de veces pero esta en perfecto estado', '15', 'maria@gmail.com', 'Levis', '40', 'Mujer');

ALTER TABLE `ropas`
  MODIFY `id_Ropa` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

-- Tabla electronicas
CREATE TABLE electronicas (
    id_Electronica CHAR(20) NOT NULL,
    PRIMARY KEY(id_Electronica),
    nombre CHAR(20),
    estado CHAR(20),
    descripcion CHAR(255),
    precio CHAR(20),
    propietario CHAR(40),
    modelo CHAR(20),
    tipo CHAR(20)
);

INSERT INTO electronicas (id_Electronica, nombre, estado, descripcion, precio, propietario, modelo, tipo) VALUES
('5', 'Portatil pavilion', 'Bueno', 'Ordenador portatil con muy poco tiempo de uso', '100', 'pepe@gmail.com', 'HP', 'PC'),
('6', 'Iphone 7', 'Roto', 'Movil con la pantalla rota por lo demas esta bien', '70', 'pepe@gmail.com', 'Iphone', 'movil');

ALTER TABLE `electronicas`
  MODIFY `id_Electronica` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

-- Tabla otros
CREATE TABLE otros (
    id_Otro CHAR(20) NOT NULL,
    PRIMARY KEY(id_Otro),
    nombre CHAR(20),
    estado CHAR(20),
    descripcion CHAR(255),
    precio CHAR(20),
    propietario CHAR(40)
);

INSERT INTO otros (id_Otro, nombre, estado, descripcion, precio, propietario) VALUES
('7', 'Mesa', 'Aceptable', 'Mesa de escritorio bastante grande', '25', 'maria@gmail.com'),
('8', 'Sofa', 'Como Nuevo', 'Sofa bastante grande caben hasta 5 personas', '50', 'pepe@gmail.com');

ALTER TABLE `otros`
  MODIFY `id_Otro` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

-- Tabla compra vehiculos
CREATE TABLE compras_Vehiculo (
    email_Comprador CHAR(40),
    email_Vendedor CHAR(40),
    id_Vehiculo CHAR(20) NOT NULL,
    PRIMARY KEY(id_Vehiculo)
);

INSERT INTO compras_Vehiculo (email_Comprador, email_Vendedor, id_Vehiculo) VALUES
('pepe@gmail.com', 'maria@gmail.com', '1'),
('maria@gmail.com', 'pepe@gmail.com', '2');

-- Tabla compra ropas
CREATE TABLE compras_Ropa (
    email_Comprador CHAR(40),
    email_Vendedor CHAR(40),
    id_Ropa CHAR(20) NOT NULL,
    PRIMARY KEY(id_Ropa)
);

INSERT INTO compras_Ropa (email_Comprador, email_Vendedor, id_Ropa) VALUES
('pepe@gmail.com', 'maria@gmail.com', '3'),
('pepe@gmail.com', 'maria@gmail.com', '4');

-- Tabla compra electronicas
CREATE TABLE compras_Electronica (
    email_Comprador CHAR(40),
    email_Vendedor CHAR(40),
    id_Electronica CHAR(20) NOT NULL,
    PRIMARY KEY(id_Electronica)
);

INSERT INTO compras_Electronica (email_Comprador, email_Vendedor, id_Electronica) VALUES
('maria@gmail.com', 'pepe@gmail.com', '5'),
('maria@gmail.com', 'pepe@gmail.com', '6');

-- Tabla compra otros
CREATE TABLE compras_Otros (
    email_Comprador CHAR(40),
    email_Vendedor CHAR(40),
    id_Otro CHAR(20) NOT NULL,
    PRIMARY KEY(id_Otro)
);

INSERT INTO compras_Otros (email_Comprador, email_Vendedor, id_Otro) VALUES
('pepe@gmail.com', 'maria@gmail.com', '7'),
('maria@gmail.com', 'pepe@gmail.com', '8');


