class PaginaHerramientas extends Crud {
    constructor(repoHerramientas) {
        super('Herramientas', repoHerramientas);

        const campos = {
            nombre: Input.Texto({ titulo: 'Nombre' }),
            consumo: Input.Numero({ titulo: 'Consumo' }),
            unidad: Seleccion.Opciones({ titulo: 'Unidad', opciones: [
                { titulo: 'Sin Consumo', valor: '-' },
                { titulo: 'Gas (cm3/hs)', valor: 'cm3/hs' },
                { titulo: 'Electricidad (Watt/hs)', valor: 'watt/hs' }
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
            <label class="consumo">Consumo</label>
            <label class="editar"></label>
        </div>`);
    }

    listadoFila(obj) {
        const ctn = $(`<div class="listado-fila">
            <label class="nombre">${obj.nombre}</label>
            <label class="consumo">${obj.consumo} ${obj.unidad}</label>
        </div>`);

        const editar = $('<button>Editar</button>');
        editar.click(() => this.editar(obj));
        ctn.append(editar);

        return ctn;
    }
}