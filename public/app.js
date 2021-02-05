let ultimoIndiceMateriaPrima = 0;
const materiasPrimas = [];

class Precio {
    constructor(precio, cantidad) {
        this.precio = precio;
        this.cantidad = cantidad;
    }

    importePorCantidad(cantidad) {
        return this.precio * cantidad / this.cantidad;
    }
}

class MateriaPrima {
    constructor(nombre, unidad, precio = null) {
        ultimoIndiceMateriaPrima++;

        this.id = ultimoIndiceMateriaPrima;
        this.nombre = nombre;
        this.unidad = unidad;

        this.precio = precio;
    }

    definirPrecio(precio) {
        this.precio = precio;
    }

    importePorCantidad(cantidad) {
        if (!this.precio) throw new Error("Precio no definido");
        
        return this.precio.importePorCantidad(cantidad);
    }
}

const ingresarMateriaPrima = () => {
    const nombre = prompt("nombre")
    if (nombre.length === 0) {
        alert("Nombre muy corto");
        return;
    }

    const unidad = prompt("unidad de medida")
    if (unidad.length != 3) {
        alert("Unidad de largo 3");
        return;
    }

    let materiaPrima = new MateriaPrima(nombre, unidad);

    materiasPrimas.push(materiaPrima);

    if (confirm("Definir precio?")) {
        const importe = parseFloat(prompt("precio"))
        if (isNaN(importe) || importe <= 0) {
            alert("Importe negativo o cero invalido");
            return;
        }

        const cantidad = parseFloat(prompt("cantidad"))
        if (isNaN(cantidad) || cantidad <= 0) {
            alert("Cantidad negativa o cero invalida");
            return;
        }

        let precio = new Precio(importe, cantidad);

        materiaPrima.definirPrecio(precio);
    }
}

const mostrarMateriasPrimas = () => {
    for (const materiaPrima of materiasPrimas) {
        console.log(materiaPrima.nombre, materiaPrima.importePorCantidad(1));
    }
}

const buscarMateriaPrima = () => {
    const nombre = prompt("nombre de materia prima");

    const busquedaMateriaPrima = materiasPrimas.find(materiaPrima => {
        return materiaPrima.nombre.toLowerCase() === nombre.toLowerCase();
    });

    if (!busquedaMateriaPrima) {
        throw new Error("materia prima no encontrada");
    }

    console.log(busquedaMateriaPrima);
}