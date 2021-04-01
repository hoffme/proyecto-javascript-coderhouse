class PaginaRecetas extends Crud {
    constructor(repoRecetas) { super('Recetas', repoRecetas) }

    filtrador() {
        const cabecera = $('<div><div>');

        cabecera.append(
            Input.Texto({
                placeholder: 'Buscar ...',
                alCambiar: texto => {
                    let filtro = {
                        __contiene__: { nombre: texto, codigo: texto }
                    };

                    if (texto.length === 0) filtro = { todos: true }

                    this.buscar(filtro)
                }
            }).render(),
            BotonPrincipal({
                titulo: 'Crear Receta',
                alClick: () => this.crear()
            })
        );

        return cabecera;
    }

    listadoCabecera() {
        return $(`<div>
            <label class="codigo">Codigo</label>
            <label class="nombre">Nombre</label>
            <label class="editar"></label>
            <label class="estadisticas"></label>
        </div>`);
    }

    listadoFila(obj) {
        const ctn = $(`<div class="listado-fila">
            <label class="codigo">${obj.codigo}</label>
            <label class="nombre">${obj.nombre}</label>
        </div>`);

        const editar = $('<button>Editar</button>');
        editar.click(() => this.editar(obj));
        ctn.append(editar);

        const estadisticas = $('<button>Estadisticas</button>');
        estadisticas.click(() => this.mostrarEstadisticas(obj));
        ctn.append(estadisticas);

        return ctn;
    }

    formularioCreacion(datos) { return this.formulario(datos) }

    formularioEdicion(datos) { return this.formulario(datos) }

    formulario(datos) {
        const codigo = $('<input  />')

        return [
            Input.Texto({ titulo: 'Codigo', valor: datos.codigo, alCambiar: t => datos.codigo = t }).render(),
            Input.Texto({ titulo: 'Nombre', valor: datos.nombre, alCambiar: t => datos.nombre = t }).render(),
            new Arreglo({ titulo: 'Tareas', valor: datos.tareas, alCambiar: t => datos.tareas = t, formulario: (datos = {}) => {
                return [
                    Input.Texto({ titulo: 'Descripcion', valor: datos.descripcion, alCambiar: t => datos.descripcion = t }).render()
                ]
            }, vista: datos => {
                return [
                    $(`<label>${datos.descripcion}</label>`)
                ]
            } }).render()
        ]
    }

    mostrarEstadisticas(receta) {
        this.abrirSlide($('<h1>Estadisticas ....</h1>'))
    }
}