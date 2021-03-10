class Navegacion {
    constructor(secciones) {
        this.nav = $('<nav class="navegacion"></nav>');
        this.seleccionado = -1;

        this.secciones = secciones.map((seccion, indice) => {
            const boton = $(`<button>${seccion.titulo}</button>`);
            boton.click(() => this.seleccionar(indice));

            this.nav.append(boton);
        
           return {...seccion, boton}; 
        });
    }

    seleccionar(indice) {
        if (indice < 0 || indice >= this.secciones.length) return;

        if (this.seleccionado >= 0 && this.seleccionado < this.secciones.length) {
            this.secciones[this.seleccionado].boton.removeClass('seleccionado');
            this.secciones[this.seleccionado].alDeseleccionar();
        }

        this.seleccionado = indice;
        this.secciones[this.seleccionado].boton.addClass('seleccionado');
        this.secciones[this.seleccionado].alSeleccionar();
    }

    render() { return this.nav }
}