class Pagina {
    constructor(nombre) {
        this.nombre = nombre;
        
        this.ctn = $(`<main class="pagina"></main>`);
        this.slide = undefined;
    }

    abrir() {
        this.slide = $(`<aside class="slide"></aside>`);
        this.ctn.append(this.slide, this._contenido());
    }

    cerrar() {
        this.slide = undefined;
        this.ctn.empty();
    }

    abrirSlide(contenido) {
        this.cerrarSlide();
        this.slide.append(contenido);
        this.slide.animate({ width: '100%' }, "fast");
    }

    cerrarSlide() {
        this.slide.animate({ width: 0 }, "fast");
        this.slide.empty();
    }

    render() { return this.ctn }
}