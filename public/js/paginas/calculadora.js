class PaginaCalculadora extends Pagina {
    constructor(repoRecetas) {
        super('Calculadora');

        this.repoRecetas = repoRecetas;

        this.contenido = $(`<div class="contenido-calculadora"></div>`);

        this.calculadora = new CalculadoraRecetas({});
    }

    _contenido() {
        const contenedor = $(`<div class="ancho"></div>`);

        contenedor.append(
            new Seleccion({
                titulo: 'Seleccione una Receta',
                alCambiar: receta => this.seleccionarReceta(receta),
                buscador: async texto => {
                    return await this.repoRecetas.obtener({ __contiene__: { nombre: texto } });
                },
                metaValor: receta => { return { titulo: receta.nombre } }
            }).render(),
            this.contenido
        )

        return contenedor;
    }

    seleccionarReceta(receta) {
        this.contenido.empty();
        this.calculadora = new CalculadoraRecetas(receta);

        
    }
}