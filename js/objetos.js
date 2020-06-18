

var texto;

class Usuario {
    constructor(dni, nombre, apellidos, gmail, direccion, nomUsuario, contraseña) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.gmail = gmail;
        this.direccion = direccion;
        this.nomUsuario = nomUsuario;
        this.contraseña = contraseña;
    }
}

class Producto{
    constructor(precio, nombre, estado, descripcion) {
        this.precio = precio;
        this.nombre = nombre;
        this.estado = estado;
        this.descripcion = descripcion;
    }
    toHTMLRow() {
        let fila = "<tr><td>"+ this.nombre +"</td><td>"+ this.descripcion +"</td><td>"+ this.estado +"</td><td>"+ this.precio +"</td>";
        return fila;
    }
}

class Vehiculo extends Producto {
    constructor(nombre, precio, estado, descripcion, color, modelo, kms) {
        super(nombre, precio, estado, descripcion);
        this.color = color;
        this.modelo = modelo;
        this.kms = kms;
    }
    toHTMLRow() {
        let fila = "<tr><td>"+ this.nombre +"</td><td>"+ this.descripcion +"</td><td>"+ this.estado +"</td><td>"+ this.precio +"</td><td>"+ this.modelo +"</td><td>"+ this.color +"</td><td>"+ this.kms +"</td></tr>";
        return fila; 
    }
}

class Ropa extends Producto {
    constructor(nombre, precio, estado, descripcion, talla, marca, sexo) {
        super(nombre, precio, estado, descripcion);
        this.talla = talla;
        this.marca = marca;
        this.sexo = sexo;
    }
    toHTMLRow() {
        let fila = "<tr><td>"+ this.nombre +"</td><td>"+ this.descripcion +"</td><td>"+ this.estado +"</td><td>"+ this.precio +"</td><td>"+ this.marca +"</td><td>"+ this.talla +"</td><td>"+ this.sexo +"</td></tr>";
        return fila;
    }
}

class Electronica extends Producto {
    constructor(nombre, precio, estado, descripcion, modelo, tipo) {
        super(nombre, precio, estado, descripcion);
        this.modelo = modelo;
        this.tipo = tipo;
    }
    toHTMLRow() {
        let fila = "<tr><td>"+ this.nombre +"</td><td>"+ this.descripcion +"</td><td>"+ this.estado +"</td><td>"+ this.precio +"</td><td>"+ this.modelo +"</td><td>"+ this.tipo +"</td>";
        return fila;
    }
}

class Otro extends Producto {
    constructor(nombre, precio, estado, descripcion) {
        super(nombre, precio, estado, descripcion);
    }
    toHTMLRow() {
        let fila = "<tr><td>"+ this.nombre +"</td><td>"+ this.descripcion +"</td><td>"+ this.estado +"</td><td>"+ this.precio +"</td></tr>"
        return fila;
    }
}

class BuyFast {
    constructor() {
        this.usuarios = [];
        this.productos = [];    
    }

    //ALTAS
    altaUsuario(usuario) {
            if (this.usuarios.filter(otroUsuario => otroUsuario.gmail == usuario.gmail).length == 0) {
                this.usuarios.push(usuario);
                texto = "Alta usuario correcta";
            } else {
                texto = "El usuario ya esta registrado";
            }
        return texto;
    }

    verificaUsuarios(nomUsuario, contraseña) {
        if (this.usuarios.filter(otroUsuario => otroUsuario.nomUsuario == nomUsuario).length == 0) {
            texto = "Nombre de usuario o contraseña incorrecto";
        } else {
            if (this.usuarios.filter(otroUsuario => otroUsuario.contraseña == contraseña).length == 0) {
                texto = "Nombre de usuario o contraseña incorrecta";
            } else {
                texto = "Datos validos";
                window.location="productos.html"
            }
        }
        return texto;
    }

    altaOtros(otro) {
        let opcion = this.buscaOtro(otro.nombre);

        if (opcion == 0) {
            this.productos.push(otro);
            texto = "Producto subido";
        } else {
            texto = "Ese producto ya ha sido subido";
        }
        return texto;
    }

    altaVehiculos(vehiculo) {
        let opcion = this.buscaVehiculo(vehiculo.nombre);

        if (opcion == 0) {
            this.productos.push(vehiculo);
            texto = "Producto subido";
        } else {
            texto = "Ese producto ya ha sido subido";
        }

        return texto;
    }

    altaRopas(ropa) {
        let opcion = this.buscaRopa(ropa.nombre);

        if (opcion == 0) {
            this.productos.push(ropa);
            texto = "Producto subido";
        } else {
            texto = "Ese producto ya ha sido subido";
        }

        return texto;
    }

    altaElectronicas(electronica) {
        let opcion = this.buscaElectronica(electronica.nombre);

        if (opcion == 0) {
            this.productos.push(electronica);
            texto = "Producto subido";
        } else {
            texto = "Ese producto ya ha sido subido";
        }
        return texto;
    }

    //Actualizar
    actualizaVehiculo(oVehiculo) {
        let antiguoVehiculo = this.buscarNombreVehiculo(oVehiculo.nombre);
        this.productos.splice(this.productos.indexOf(antiguoVehiculo), 1);
        this.productos.push(oVehiculo);
        return "Actualizado correctamente";
    }

    actualizaRopa(oRopa) {
        let antiguaRopa = this.buscarNombreRopa(oRopa.nombre);
        this.productos.splice(this.productos.indexOf(antiguaRopa), 1);
        this.productos.push(oRopa);
        return "Actualizado correctamente";
    }

    actualizaElectronica(oElectronica) {
        let antiguaElectronica = this.buscarNombreElectronica(oElectronica.nombre);
        this.productos.splice(this.productos.indexOf(antiguaElectronica), 1);
        this.productos.push(oElectronica);
        return "Actualizado correctamente";
    }

    actualizaOtro(oOtro) {
        let antiguoOtro = this.buscarNombreOtro(oOtro.nombre);
        this.productos.splice(this.productos.indexOf(antiguoOtro), 1);
        this.productos.push(oOtro);
        return "Actualizado correctamente";
    }

    //Eliminar
    eliminarVehiculo(nombre) {
        let vehiculoAEliminar = this.buscarNombreVehiculo(nombre);
        this.productos.splice(this.productos.indexOf(vehiculoAEliminar), 1);
        return "El vehiculo ha sido eliminado correctamente";
    }

    eliminarRopa(nombre) {
        let ropaAEliminar = this.buscarNombreRopa(nombre);
        this.productos.splice(this.productos.indexOf(ropaAEliminar), 1);
        return "La prenda ha sido eliminada correctamente";
    }

    eliminarElectronica(nombre) {
        let electronicaAEliminar = this.buscarNombreElectronica(nombre);
        this.productos.splice(this.productos.indexOf(electronicaAEliminar), 1);
        return "El producto electronico ha sido eliminado correctamente"
    }

    eliminarOtro(nombre) {
        let otroAEliminar = this.buscarNombreOtro(nombre);
        this.productos.splice(this.productos.indexOf(otroAEliminar), 1);
        return "El producto ha sido eliminado correctamente";
    }

    //GET
    getVehiculos() {
        let vehiculos = [];
        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Vehiculo") {
                vehiculos.push(producto);
            }
        });
        return vehiculos;
    }

    getRopas() {
        let ropas = [];
        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Ropa") {
                ropas.push(producto);
            }
        });
        return ropas;
    }

    getElectronicas() {
        let electronicas = [];
        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Electronica") {
                electronicas.push(producto);
            }
        });
        return electronicas;
    }

    getOtros() {
        let otros = [];
        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Otro") {
                otros.push(producto);
            }
        })
        return otros;
    }

    //LISTADOS

    listadoVehiculos() {
        //Nombre de la tabla
        let tabla = "<thead class='thead-dark'><tr><th style='text-align: center; font-size: 1.5em;' colspan='8'>VEHICULOS</th></tr></thead>";
        //Columnas de la tabla
        tabla += "<thead class='thead-light'><tr><th>Nombre</th><th>Descripción</th><th>Estado</th><th>Precio</th><th>Modelo</th><th>Color</th><th>Kilometros</th></tr></thead>";

        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Vehiculo") {
                let vehiculo = new Vehiculo(producto.precio, producto.nombre, producto.estado, producto.descripcion, producto.color, producto.modelo, producto.kms);
                tabla += vehiculo.toHTMLRow();
            }
        });

        return tabla;
    }

    listadoRopas() {
        //Nombre de la tabala
        let tabla = "<thead class='thead-dark'><tr><th style='text-align: center; font-size: 1.5em;' colspan='8'>ROPA</th></tr></thead>";
        //Columnas de la tabala
        tabla += "<thead class='thead-light'><tr><th>Nombre</th><th>Descripción</th><th>Estado</th><th>Precio</th><th>Marca</th><th>Talla</th><th>Sexo</th></tr></thead>";

        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Ropa") {
                let ropa = new Ropa(producto.precio, producto.nombre, producto.estado, producto.descripcion, producto.talla, producto.marca, producto.sexo);
                tabla += ropa.toHTMLRow();
            }
        });

        return tabla;
    }

    listadoElectronicas() {
        //Nombre de la tabala
        let tabla = "<thead class='thead-dark'><tr><th style='text-align: center; font-size: 1.5em;' colspan='7'>Electronica</th></tr></thead>";
        //Columnas de la tabla
        tabla += "<thead class='thead-light'><tr><th>Nombre</th><th>Descripción</th><th>Estado</th><th>Precio</th><th>Modelo</th><th>Tipo</th></tr></thead>";

        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Electronica") {
                let electronica = new Electronica(producto.precio, producto.nombre, producto.estado, producto.descripcion, producto.modelo, producto.tipo);
                tabla += electronica.toHTMLRow();
            }
        });

        return tabla;
    }

    listadoOtros() {
        //Nombre de la tabla
        let tabla = "<thead class='thead-dark'><tr><th style='text-align: center; font-size: 1.5em;' colspan='4'>Otros productos</th></tr></thead>";
        //Columnas de la tabla
        tabla += "<thead class='thead-light'><tr><th>Nombre</th><th>Descripción</th><th>Estado</th><th>Precio</th></thead>";

        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Otro") {
                let otro = new Otro(producto.precio, producto.nombre, producto.estado, producto.descripcion);
                tabla += otro.toHTMLRow();
            }
        });
        return tabla;
    }

    listadoTodos() {
        //Nombre de la tabla vehiculos
        let tabla = "<thead class='thead-dark'><tr><th style='text-align: center; font-size: 1.5em;' colspan='7'>VEHICULOS</th></tr></thead>";
        //Columnas de la tabla vehiculos
        tabla += "<thead class='thead-light'><tr><th>Nombre</th><th>Descripción</th><th>Estado</th><th>Precio</th><th>Modelo</th><th>Color</th><th>Kilometros</th></tr></thead>";

        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Vehiculo") {
                let vehiculo = new Vehiculo(producto.precio, producto.nombre, producto.estado, producto.descripcion, producto.color, producto.modelo, producto.kms);
                tabla += vehiculo.toHTMLRow();
            }
        });

        //Nombre de la tabla ropas
        tabla += "<thead class='thead-dark'><tr><th style='text-align: center; font-size: 1.5em;' colspan='7'>ROPA</th></tr></thead>";
        //Columnas de la tabla ropas
        tabla += "<thead class='thead-light'><tr><th>Nombre</th><th>Descripción</th><th>Estado</th><th>Precio</th><th>Marca</th><th>Talla</th><th>Sexo</th></tr></thead>";

        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Ropa") {
                let ropa = new Ropa(producto.precio, producto.nombre, producto.estado, producto.descripcion, producto.talla, producto.marca, producto.sexo);
                tabla += ropa.toHTMLRow();
            }
        });


        //Nombre de la tabala electronicas
        tabla += "<thead class='thead-dark'><tr><th style='text-align: center; font-size: 1.5em;' colspan='7'>Electronica</th></tr></thead>";
        //Columnas de la tabla elctronicas
        tabla += "<thead class='thead-light'><tr><th>Nombre</th><th>Descripción</th><th>Estado</th><th>Precio</th><th>Modelo</th><th>Tipo</th><th></th></tr></thead>";

        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Electronica") {
                let electronica = new Electronica(producto.precio, producto.nombre, producto.estado, producto.descripcion, producto.modelo, producto.tipo);
                tabla += electronica.toHTMLRow();
            }
        });

        //Nombre de la tabla otros
        tabla += "<thead class='thead-dark'><tr><th style='text-align: center; font-size: 1.5em;' colspan='7'>Otros</th></tr></thead>";
        //Columnas de la tabla otros
        tabla += "<thead class='thead-light'><tr><th>Nombre</th><th>Descripción</th><th>Estado</th><th>Precio<th></th><th></th><th></th></thead>";

        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Otro") {
                let otro = new Otro(producto.precio, producto.nombre, producto.estado, producto.descripcion);
                tabla += otro.toHTMLRow();
                tabla += "<td></td><td></td><td></td></tr>";
            }
        })

        return tabla;
    }

    //BUSCADOR
    buscaVehiculo (nombreVehiculo) {
        let existe = 0;
        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Vehiculo" && producto.nombre == nombreVehiculo) {
                existe = 1;
            } 
        });
        return existe;
    }

    buscaRopa (nombreRopa) {
        let existe = 0;
        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Ropa" && producto.nombre == nombreRopa) {
                existe = 1;
            }
        });
        return existe;
    }

    buscaElectronica (nombreElectronica) {
        let existe = 0;
        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Electronica" && producto.nombre == nombreElectronica) {
                existe = 1;
            }
        });
        return existe;
    }

    buscaOtro (nombreOtro) {
        let existe = 0;
        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Otro" && producto.nombre == nombreOtro) {
                existe = 1;
            }
        });
        return existe;
    }

    buscarNombreVehiculo (nombreVehiculo) {
        let vehiculoADevolver = "";
        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Vehiculo" && producto.nombre == nombreVehiculo) {
                vehiculoADevolver = producto;
                return vehiculoADevolver
            }
        });
        return vehiculoADevolver;
    } 

    buscarNombreRopa (nombreRopa) {
        let ropaADevolver = "";
        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Ropa" && producto.nombre == nombreRopa) {
                ropaADevolver = producto;
                return ropaADevolver
            }
        });
        return ropaADevolver;
    }

    buscarNombreElectronica (nombreElectronica) {
        let electronicaADevolver = "";
        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Electronica" && producto.nombre == nombreElectronica) {
                electronicaADevolver = producto;
                return electronicaADevolver;
            }
        });
        return electronicaADevolver;
    }

    buscarNombreOtro (nombreOtro) {
        let otroADevolver = "";
        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Otro" && producto.nombre == nombreOtro) {
                otroADevolver = producto;
                return otroADevolver;
            } 
        });
        return otroADevolver;
    }

    buscarVehiculoExistente(nombre) {
        //Nombre de la tabla
        let tabla = "<thead class='thead-dark'><tr><th style='text-align: center; font-size: 1.5em;' colspan='8'>VEHICULOS</th></tr></thead>";
        //Columnas de la tabla
        tabla += "<thead class='thead-light'><tr><th>Nombre</th><th>Descripción</th><th>Estado</th><th>Precio</th><th>Modelo</th><th>Color</th><th>Kilometros</th></tr></thead>";

        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Vehiculo" && producto.nombre == nombre) {
                let vehiculo = new Vehiculo(producto.precio, producto.nombre, producto.estado, producto.descripcion, producto.color, producto.modelo, producto.kms);
                tabla += vehiculo.toHTMLRow();
            }
        });

        return tabla;
    }

    buscarRopaExistente(nombre) {
        //Nombre de la tabala
        let tabla = "<thead class='thead-dark'><tr><th style='text-align: center; font-size: 1.5em;' colspan='8'>ROPA</th></tr></thead>";
        //Columnas de la tabala
        tabla += "<thead class='thead-light'><tr><th>Nombre</th><th>Descripción</th><th>Estado</th><th>Precio</th><th>Marca</th><th>Talla</th><th>Sexo</th></tr></thead>";

        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Ropa" && producto.nombre == nombre) {
                let ropa = new Ropa(producto.precio, producto.nombre, producto.estado, producto.descripcion, producto.talla, producto.marca, producto.sexo);
                tabla += ropa.toHTMLRow();
            }
        })
        return tabla;
    }

    buscarElectronicaExistente(nombre) {
        //Nombre de la tabala electronicas
        let tabla = "<thead class='thead-dark'><tr><th style='text-align: center; font-size: 1.5em;' colspan='7'>Electronica</th></tr></thead>";
        //Columnas de la tabla elctronicas
        tabla += "<thead class='thead-light'><tr><th>Nombre</th><th>Descripción</th><th>Estado</th><th>Precio</th><th>Modelo</th><th>Tipo</th></tr></thead>";

        this.productos.forEach((producto) => {
            if (producto.constructor.name == "Electronica" && producto.nombre == nombre) {
                let electronica = new Electronica(producto.precio, producto.nombre, producto.estado, producto.descripcion, producto.modelo, producto.tipo);
                tabla += electronica.toHTMLRow();
            }
        });
        return tabla;
    }

    buscarOtroExistente(nombre) {
        //Nombre de la tabla otros
        let tabla = "<thead class='thead-dark'><tr><th style='text-align: center; font-size: 1.5em;' colspan='7'>Otros</th></tr></thead>";
        //Columnas de la tabla otros
        tabla += "<thead class='thead-light'><tr><th>Nombre</th><th>Descripción</th><th>Estado</th><th>Precio</th></thead>";

        this.productos.forEach((producto) => {
            if (producto.constructor.name != "Vehiculo" && producto.constructor.name != "Ropa" && producto.constructor.name != "Electronica" && producto.nombre == nombre) {
                tabla += producto.toHTMLRow();
                
            }
        })

        return tabla;
    }
}