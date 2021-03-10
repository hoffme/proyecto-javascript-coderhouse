class Pagina {
    constructor(nombre) {
        this.nombre = nombre;
    }

    _contenido() { }

    render() {
        const ctn = $(`<div class="pagina">
            <h1>${this.nombre}</h1>
        </div>`);

        ctn.append(this._contenido());

        return ctn;
    }
}