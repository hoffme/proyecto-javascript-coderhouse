class PaginaHerramientas extends Crud {
    constructor(repoHerramientas) {
        super('Herramientas', repoHerramientas);

        const campos = {
            nombre: Input.Texto({ titulo: 'Nombre' }),
            costo: Input.Numero({ titulo: 'Costo ($ / hs)' }),
            capacidad: Input.Texto({ titulo: 'Capacidad' }),
            unidad: Seleccion.Opciones({ titulo: 'Medida', opciones: [
                { titulo: 'Gramos', valor: 'grs' },
                { titulo: 'Mililitros', valor: 'mls' }
            ]})
        };

        this.formulario_creacion.campos = campos;
        this.formulario_edicion.campos = campos;
    }

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
                titulo: 'Crear Herramienta',
                alClick: () => this.crear()
            })
        );

        return cabecera;
    }

    listadoCabecera() {
        return $(`<div>
            <label class="nombre">Nombre</label>
            <label class="costo">Costo ($ / hs)</label>
            <label class="capacidad">Capacidad</label>
            <label class="editar"></label>
        </div>`);
    }

    listadoFila(obj) {
        const ctn = $(`<div class="listado-fila">
            <label class="nombre">${obj.nombre}</label>
            <label class="costo">${obj.costo}</label>
            <label class="costo">${obj.capacidad} ${obj.unidad}</label>
        </div>`);

        const editar = $('<button>Editar</button>');
        editar.click(() => this.editar(obj));
        ctn.append(editar);

        return ctn;
    }
}