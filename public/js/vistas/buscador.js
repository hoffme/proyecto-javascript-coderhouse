class Buscador {
    constructor(repositorio, filtro, vista) {
        this.repositorio = repositorio;
        this.filtro = filtro;
        this.vista = vista;

        this.listado = $('<div class="listado"></div>');

        this.input = $('<input placeholder="Buscar ..." />');
        this.input.keypress(() => this.actualizarListado(this.input.value));
    }

    actualizarListado(query = "") {
        this.listado.empty();

        const resultados = this.repositorio.obtener(query, this.filtro);

        resultados.forEach(resultado => {
            const contenedor = $('<div class="fila"/></div>');
            this.vista(contenedor, resultado);
            this.listado.append(contenedor);
        });

        if (this.listado.is(':empty')) {
            this.listado.text('No se han encontrado resultados');
        }
    }

    render() {
        this.actualizarListado("");
        
        const contenedor = $('<div class="buscador"></div>');
        contenedor.append(this.input, this.listado);
    
        return contenedor;
    }
}