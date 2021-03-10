const REPOSITORIOS = {
    costos_fijos: new Repositorio('costos-fijos'),
    empleados: new Repositorio('empleados'),
    herramientas: new Repositorio('herramientas'),
    productos: new Repositorio('productos'),
    recetas: new Repositorio('recetas')
}

class App {
    iniciar(id) {
        const PAGINAS = [
            new PaginaRecetas(),
            new PaginaProductos(),
            new PaginaHerramientas(),
            new PaginaEmpleados(),
            new PaginaCostosFijos()
        ]
    
        const paginas = $('<main></main>');

        const nav = new Navegacion(paginas);
        PAGINAS.forEach(pagina => nav.agregar(pagina));
        nav.seleccionar(PAGINAS[0].nombre);
    
        const ctn = $(`#${id}`);
        ctn.prepend(nav.render(), paginas);
    }
}