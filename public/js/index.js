const PAGINAS = [
    PAGINA_RECETAS,
    PAGINA_PRODUCTOS,
    PAGINA_HERRAMIENTAS,
    PAGINA_EMPLEADOS,
    PAGINA_COSTOS_FIJOS
]

window.onload = () => {
    const raiz = document.getElementById('raiz');
    const paginas = document.createElement('main');

    const nav = new Navegacion(paginas);
    PAGINAS.forEach(pagina => nav.agregar(pagina));
    nav.seleccionar(PAGINAS[0].nombre);

    raiz.append(nav.render(), paginas);
}