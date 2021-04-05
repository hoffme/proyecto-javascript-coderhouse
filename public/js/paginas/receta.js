class PaginaRecetas extends Crud {
    constructor(repoRecetas, repoIngredientes, repoHerramientas) {
        super('Recetas', repoRecetas);

        const campos_ingrediente = {
            ingrediente: new Seleccion({
                titulo: 'Ingrediente',
                buscador: async texto => await repoIngredientes.obtener({__contiene__: { nombre: texto }}),
                metaValor: valor => {return { titulo: valor.nombre }}
            }),
            cantidad: Input.Numero({ titulo: 'Cantidad' }),
            unidad: Seleccion.Opciones({
                titulo: 'Unidad',
                opciones: [
                    { titulo: 'Gramos', valor: 'grs' },
                    { titulo: 'Mililitros', valor: 'mls' },
                ]
            })
        }

        const campos_herramienta = {
            herramienta: new Seleccion({
                titulo: 'Herramienta',
                buscador: async texto => await repoHerramientas.obtener({__contiene__: { nombre: texto }}),
                metaValor: valor => {return { titulo: valor.nombre }}
            }),
            tiempo: new Input({ titulo: 'Tiempo (min)' }, { type: 'time' }),
        }

        const campos_paso = {
            nombre: Input.Texto({ titulo: 'Nombre' }),
            descripcion: Input.Texto({ titulo: 'Descripcion' }),
            tiempo: new Input({ titulo: 'Tiempo' }, { type: 'time' }),
            tiempoTrabajo: new Input({ titulo: 'Tiempo Trabajo' }, { type: 'time' }),
            ingredientes: new Arreglo({
                titulo: 'Ingredientes',
                vista: datos => [ $(`<label>${datos.ingrediente ? datos.ingrediente.nombre : '-'}</label>`) ],
                formulario_creacion: new Formulario({ campos: campos_ingrediente }),
                formulario_edicion: new Formulario({ campos: campos_ingrediente })
            }),
            herramientas: new Arreglo({
                titulo: 'Herramientas',
                vista: datos => [ $(`<label>${datos.herramienta ? datos.herramienta.nombre : '-'}</label>`) ],
                formulario_creacion: new Formulario({ campos: campos_herramienta }),
                formulario_edicion: new Formulario({ campos: campos_herramienta })
            })
        }

        const campos = {
            nombre: Input.Texto({ titulo: 'Nombre' }),
            rendimiento: Input.Numero({ titulo: 'Rendimiento' }),
            pasos: new Arreglo({
                titulo: 'Pasos',
                vista: datos => [ $(`<label>${datos.nombre}</label>`) ],
                formulario_creacion: new Formulario({ campos: campos_paso }),
                formulario_edicion: new Formulario({ campos: campos_paso })
            })
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
                titulo: 'Crear Receta',
                alClick: () => this.crear()
            })
        );

        return cabecera;
    }

    listadoCabecera() {
        return $(`<div>
            <label class="nombre">Nombre</label>
            <label class="pasos">Pasos</label>
            <label class="rendimiento">Rendimiento</label>
            <label class="editar"></label>
        </div>`);
    }

    listadoFila(obj) {
        const ctn = $(`<div class="listado-fila">
            <label class="nombre">${obj.nombre}</label>
            <label class="pasos">${obj.pasos.length}</label>
            <label class="rendimiento">${obj.rendimiento}</label>
        </div>`);

        const editar = $('<button>Editar</button>');
        editar.click(() => this.editar(obj));
        ctn.append(editar);

        return ctn;
    }
}