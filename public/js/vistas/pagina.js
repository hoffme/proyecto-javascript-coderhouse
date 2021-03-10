class Pagina {
    constructor(nombre) {
        this.nombre = nombre;
        
        this.ctn = $(`<main class="pagina"></main>`);
        this.slide = $(`<aside class="slide"></aside>`);
    }

    abrirSlide(contenido) {
        this.slide.append(contenido);
        this.slide.animate({ width: '100%' }, "fast");
    }

    cerrarSlide() {
        this.slide.animate({ width: 0 }, "fast");
        this.slide.empty();
    }

    _contenido() { }

    render() {
        this.ctn.empty();
        
        this.ctn.prepend(`<h1>${this.nombre}</h1>`);
        this.ctn.prepend(this.slide);
        this.ctn.append(this._contenido());
        
        return this.ctn;
    }
}