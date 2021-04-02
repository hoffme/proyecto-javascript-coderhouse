class PaginaRecetas extends Crud {
    constructor(repoRecetas) {
        super('Recetas', repoRecetas);

        const campos_ingredientes = {
            ingrediente: Seleccion.Consulta({
                titulo: 'Ingrediente',
                consulta: texto => {
                    return {
                        'mermelada-frutilla': 'Mermelada de Frutilla',
                        'harina-000': 'Harina 000',
                        'harina-0000': 'Harina 0000',
                        'dulce-de-leche': 'Dulce de Leche',
                        'crema-pastelera': 'Crema Pasteler',
                        'hojaldre': 'Hojaldre',
                    }
                }
            }),
            cantidad: Input.Numero({ titulo: 'Cantidad' }),
            unidad: Seleccion.Opciones({
                titulo: 'Unidad',
                opciones: {
                    'masa-grs': 'Gramos',
                    'vol-mlt': 'Mililitros'
                }
            })
        }

        const campos_tareas = {
            nombre: Input.Texto({ titulo: 'Nombre' }),
            descripcion: Input.Texto({ titulo: 'Descripcion' }),
            tiempo: new Input({ titulo: 'Tiempo' }, { type: 'time' }),
            ingredientes: new Arreglo({
                titulo: 'Ingredientes',
                valor: datos => [ $(`<label>${datos.ingrediente.nombre}</label>`) ],
                formulario_creacion: new Formulario({ campos: campos_ingredientes }),
                formulario_edicion: new Formulario({ campos: campos_ingredientes })
            })
        }

        const campos = {
            codigo: Input.Texto({ titulo: 'Codigo' }),
            nombre: Input.Texto({ titulo: 'Nombre' }),
            tareas: new Arreglo({
                titulo: 'Tareas',
                vista: datos => [ $(`<label>${datos.nombre}</label>`) ],
                formulario_creacion: new Formulario({ campos: campos_tareas }),
                formulario_edicion: new Formulario({ campos: campos_tareas })
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

    mostrarEstadisticas(receta) {
        this.abrirSlide($('<h1>Estadisticas ....</h1>'))
    }
}