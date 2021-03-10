class Navegacion {
    constructor(raizPaginas) {
        this.nav = $('<nav class="navegacion"></nav>');

        this.paginas = {};
        this.raizPaginas = raizPaginas;
    }

    agregar(pagina) {
        const boton = $(`<button>${pagina.nombre.toUpperCase()}</button>`);
        boton.click(() => this.seleccionar(pagina.nombre));
    
        this.nav.append(boton);
        this.paginas[pagina.nombre] = {pagina, boton};
    }

    seleccionar(nombre) {
        if (!nombre in this.paginas) return;

        Object.values(this.paginas).forEach(pagina => {
            pagina.boton.removeClass('seleccionado')
        });
        this.paginas[nombre].boton.addClass('seleccionado');

        this.raizPaginas.empty();
        this.raizPaginas.append(this.paginas[nombre].pagina.render());
    }

    render() { return this.nav }
}