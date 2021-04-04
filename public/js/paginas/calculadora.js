class PaginaCalculadora extends Pagina {
    constructor() {
        super('calculadora');
    }

    _contenido() {
        return $(`<h1>Calculadora</h1>`);
    }
}