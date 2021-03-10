class Pagina {
    constructor(nombre) {
        this.nombre = nombre;
        this.ctn = $(`<main class="pagina"></main>`);
    }

    _contenido() { }

    render() {
        this.ctn.empty();
        
        this.ctn.prepend(`<h1>${this.nombre}</h1>`);
        this.ctn.append(this._contenido());
        
        return this.ctn;
    }
}