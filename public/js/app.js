class App {
    constructor(idRaiz) {
        this.raiz = $(`#${idRaiz}`);

        this.paginas = [
            new PaginaRecetas(),
            new PaginaMateriaPrima(),
            new PaginaProvedores(),
            new PaginaHerramientas(),
            new PaginaEmpleados(),
            new PaginaCostos()
        ]

        this.navegacion = new Navegacion(this.paginas.map((pagina, indice) => {
            return {
                titulo: pagina.nombre,
                alSeleccionar: () => this.abrir(indice),
                alDeseleccionar: () => this.cerrar(indice)
            }
        }));
        this.raiz.prepend(this.navegacion.render());

        this.navegacion.seleccionar(0);
    }

    abrir(indicePagina) {
        if (indicePagina < 0 || indicePagina >= this.paginas.length) return;

        this.raiz.append(this.paginas[indicePagina].render());
    }

    cerrar(indicePagina) {
        if (indicePagina < 0 || indicePagina >= this.paginas.length) return;

        this.paginas[indicePagina].ctn.remove();
    }
}