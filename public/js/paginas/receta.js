class PaginaRecetas extends Pagina {
    constructor() { super('Recetas') }

    _contenido() {
        const boton = $('<button>Abrir Slide</button>');
        boton.click(() => this.abrirSlide($('<h1>Holis</h1>')));
        
        const boton2 = $('<button>Cerrar Slide</button>');
        boton2.click(() => this.cerrarSlide());
        
        const ctn = $(`<div></div>`);
        ctn.prepend(boton, boton2);

        return ctn;
    }
}