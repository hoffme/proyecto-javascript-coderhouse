const materiasPrimas = []

const ingresarMateriaPrima = () => {
    const nombre = prompt("nombre")
    if (nombre.length === 0) {
        alert("Nombre muy corto");
        return;
    }

    const cantidad = parseFloat(prompt("cantidad"))
    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Cantidad negativa o cero invalida");
        return;
    }    
    
    const medida = prompt("medida")
    if (medida.length === 0) {
        alert("Medida muy corta");
        return;
    }

    materiasPrimas.push({
        nombre: nombre,
        cantidad: cantidad,
        medida: medida
    })
}

const mostrarMateriasPrimas = () => {
    for (const materiaPrima of materiasPrimas) {
        console.log(materiaPrima);
    }
}