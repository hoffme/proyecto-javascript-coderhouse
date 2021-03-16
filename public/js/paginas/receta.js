class PaginaRecetas extends Crud {
    constructor() { super('Recetas', contexto.repositorios.recetas) }

    filaCabecera() {
        return $(`<div>
            <label class="codigo">Codigo</label>
            <label class="nombre">Nombre</label>
            <label class="editar"></label>
            <label class="estadisticas"></label>
        </div>`);
    }

    mostrarEstadisticas(receta) {
        this.abrirSlide($('<h1>Estadisticas ....</h1>'))
    }

    fila(obj) {
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

    cabeceraBusqueda() {
        const cabecera = $('<div><div>');

        cabecera.append(
            Texto({
                placeholder: 'Buscar ...',
                alCambiar: texto => {
                    let filtro = {
                        __contiene__: { nombre: texto, codigo: texto }
                    };

                    if (texto.length === 0) filtro = { todos: true }

                    this.buscar(filtro)
                }
            }),
            BotonPrincipal({
                titulo: 'Crear Receta',
                alClick: () => this.crear()
            })
        );

        return cabecera;
    }

    formularioCreacion(datos) { return this.formulario(datos) }

    formularioEdicion(datos) { return this.formulario(datos) }

    formulario(datos) {
        return [
            Texto({ titulo: 'Codigo', valor: datos.codigo, alCambiar: t => datos.codigo = t }),
            Texto({ titulo: 'Nombre', valor: datos.nombre, alCambiar: t => datos.nombre = t }),
        ]
    }
}