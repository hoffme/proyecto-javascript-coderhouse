const PAGINAS = [
    new PaginaRecetas(),
    new PaginaProductos(),
    new PaginaHerramientas(),
    new PaginaEmpleados(),
    new PaginaCostosFijos()
]

$(() => {
    const paginas = $('<main></main>');

    const nav = new Navegacion(paginas);
    PAGINAS.forEach(pagina => nav.agregar(pagina));
    nav.seleccionar(PAGINAS[0].nombre);

    $("#raiz").prepend(nav.render(), paginas);
});