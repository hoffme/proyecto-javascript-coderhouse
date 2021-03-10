class Pagina {
    constructor(nombre) {
        this.nombre = nombre;
        this.contenedor = $('<div class="pagina"></div>');
    }

    contenido(renderizador) { renderizador(this.contenedor); }

    render() { return this.contenedor }
}