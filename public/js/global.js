const PAGINAS = [
    { nombre: "inicio", url: document.location.origin },
    { nombre: "recetas", url: document.location.origin + "/pages/recetas" },
    { nombre: "pasos", url: document.location.origin + "/pages/pasos" },
    { nombre: "productos", url: document.location.origin + "/pages/productos" },
    { nombre: "herramientas", url: document.location.origin + "/pages/herramientas" },
    { nombre: "empleados", url: document.location.origin + "/pages/empleados" },
    { nombre: "costos fijos", url: document.location.origin + "/pages/costos-fijos" },
]

const REPOSITORIOS = {
    costosFijos: new Repositorio('costos-fijos'),
    empleados: new Repositorio('empleados'),
    herramientas: new Repositorio('herramientas'),
    productos: new Repositorio('productos'),
    recetas: new Repositorio('recetas')
}

function navegacion(idNavegacion, paginas) {
    const listado = document.createElement('ul');

    paginas.map(pagina => {
        const contenedorLink = document.createElement('li');
        
        const link = document.createElement('a');
        link.textContent = pagina.nombre.toUpperCase();
        link.href = pagina.url;

        contenedorLink.appendChild(link);
        listado.appendChild(contenedorLink);
    })

    const nav = document.getElementById(idNavegacion);
    nav.appendChild(listado);
}

window.addEventListener('load', () => {
    navegacion('navegacion', PAGINAS);
});