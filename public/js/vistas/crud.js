class Crud extends Pagina {
    constructor(nombre, repositorio) {
        super(nombre);
        
        this.repositorio = repositorio;

        this.listado = $(`<div class="listado"><div>`);
        
        this.buscar();
    }

    // metodos abstractos

    filtrador() { return $('<div></div>'); }

    listadoCabecera() { return $('<div></div>'); }

    listadoFila(datos) { return $('<div></div>'); }

    formularioCreacion(datos) { return $('<div></div>'); }

    formularioEdicion(datos) { return $('<div></div>'); }

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

        if (!resultados || resultados.length === 0) {
            this.listado.append(`<label class="mensaje">
                No se han encontrado resultados
            </label>`);
        } else {
            resultados.forEach(datos => {
                const datos_formateados = this.formatearDatosRepositorio(datos);

                const vista = this.listadoFila(datos_formateados);
                if (!vista) return;
    
                vista.addClass('listado-fila');
                this.listado.append(vista);
            })
        }
    }

    crear() {
        const datos = {};

        const ctn = $(`<div class="formulario"><h2>Crear</h2></div>`);

        const crear = $(`<button class="boton boton-principal">Crear</button>`);
        crear.click(async () => {
            const datos_formateados = this.formatearDatosFormulario(datos, true);
            if (!datos_formateados) return;

            await this.repositorio.crear(datos_formateados);

            this.cerrarSlide();
            this.buscar({});
        })

        const cancelar = $(`<button class="boton">Cancelar</button>`);
        cancelar.click(() => {
            this.cerrarSlide();
            this.buscar();
        })

        ctn.append(
            this.formularioCreacion(datos),
            crear,
            cancelar
        );

        this.abrirSlide(ctn);
    }

    editar(datos = {}) {
        const ctn = $(`<div class="formulario"><h2>Editar</h2></div>`);

        const guardar = $(`<button class="boton boton-principal">Guardar</button>`);
        guardar.click(async () => {
            const datos_formateados = this.formatearDatosFormulario(datos, false);
            if (!datos_formateados) return;

            await this.repositorio.actualizar(datos_formateados);

            this.cerrarSlide();
            this.buscar({});
        })
        
        const eliminar = $(`<button class="boton">Eliminar</button>`);
        eliminar.click(async () => {
            await this.repositorio.remover(datos.id);

            this.cerrarSlide()
            this.buscar({});
        })
        
        const cancelar = $(`<button class="boton">Cancelar</button>`);
        cancelar.click(() => {
            this.cerrarSlide();            
            this.buscar({});
        })
        
        ctn.append(
            this.formularioEdicion(datos),
            guardar,
            eliminar,
            cancelar
        );

        this.abrirSlide(ctn);
    }
    
    eliminar(id) { return this.repositorio.remover(id) }
}