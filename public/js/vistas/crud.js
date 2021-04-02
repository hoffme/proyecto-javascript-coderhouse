class Crud extends Pagina {
    constructor(nombre, repositorio) {
        super(nombre);
        
        this.repositorio = repositorio;

        this.listado = $(`<div class="listado"><div>`);

        this.formulario_creacion = new Formulario({
            titulo: 'Crear',
            alGuardar: async (datos) => {
                const datos_formateados = this.formatearDatosFormulario(datos, true);
                if (!datos_formateados) return;
    
                await this.repositorio.crear(datos_formateados);
    
                this.cerrarSlide();
                this.buscar({});
            },
            alCancelar: () => {
                this.cerrarSlide();
                this.buscar();
            }
        });

        this.formulario_edicion = new Formulario({
            titulo: 'Editar',
            alGuardar: async (datos) => {
                const datos_formateados = this.formatearDatosFormulario(datos, false);
                if (!datos_formateados) return;
    
                await this.repositorio.actualizar(datos_formateados);
    
                this.cerrarSlide();
                this.buscar({});
            },
            alCancelar: () => {
                this.cerrarSlide();            
                this.buscar({});
            },
            alEliminar: async (datos) => {
                await this.repositorio.remover(datos.id);
    
                this.cerrarSlide()
                this.buscar({});
            }
        });

        this.buscar();
    }

    // metodos abstractos

    filtrador() { return $('<div></div>'); }

    listadoCabecera() { return $('<div></div>'); }

    listadoFila(datos) { return $('<div></div>'); }

    formatearDatosFormulario(datos, creacion) { return datos; }

    formatearDatosRepositorio(datos) { return datos; }

    // metodos concretos

    _contenido() {
        const contenido = $('<div class="ancho pagina-crud"></div>');

        const cabecera = this.filtrador();
        cabecera.addClass('cabecera');

        contenido.append(cabecera, this.listado);

        this.buscar();

        return contenido
    }

    async buscar(filtro) {        
        const resultados = await this.repositorio.obtener(filtro);

        this.listado.empty();

        const cabecera = this.listadoCabecera();
        cabecera.addClass('listado-cabecera');
        this.listado.append(cabecera);

        resultados.forEach(datos => {
            const datos_formateados = this.formatearDatosRepositorio(datos);

            const vista = this.listadoFila(datos_formateados);
            if (!vista) return;

            vista.addClass('listado-fila');
            this.listado.append(vista);
        })

        if (resultados.length === 0) {
            this.listado.append(`<label class="mensaje">No hay resultados</label>`);
        }
    }

    crear() {
        this.formulario_creacion.datos = {};
        this.abrirSlide(this.formulario_creacion.render());
    }

    editar(datos) {
        this.formulario_edicion.datos = datos;
        this.abrirSlide(this.formulario_edicion.render());
    }
    
    eliminar(id) { return this.repositorio.remover(id) }
}