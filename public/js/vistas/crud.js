class Crud extends Pagina {
    constructor(nombre, repositorio) {
        super(nombre);
        
        this.repositorio = repositorio;
        this.listado = $(`<div class="listado"><div>`);

        this.buscar();
    }

    // metodos abstractos

    filaCabecera() { return null }

    fila(fila) { return null }

    cabeceraBusqueda(contenedor) { }

    formularioCreacion(datos) { return null }

    formularioEdicion(datos) { return null }

    // metodos concretos

    async buscar(filtro) {
        this.listado.empty();
        
        const resultados = await this.repositorio.obtener(filtro);

        const cabecera = this.filaCabecera();
        cabecera.addClass('listado-cabecera');
        this.listado.append(cabecera);

        if (!resultados || resultados.length === 0) {
            this.listado.append(`<label class="mensaje">
                No se han encontrado resultados
            </label>`);
        }

        resultados.forEach(fila => {
            const vista = this.fila(fila);
            if (!vista) return;

            vista.addClass('listado-fila');
            this.listado.append(vista);
        })
    }

    crear() {
        const obj = {};

        const ctn = $(`<div class="formulario"><h2>Crear</h2></div>`);

        const crear = $(`<button class="boton boton-principal">Crear</button>`);
        crear.click(async () => {
            await this.repositorio.crear(obj);

            this.cerrarSlide();
            this.buscar({});
        })

        const cancelar = $(`<button class="boton">Cancelar</button>`);
        cancelar.click(() => {
            this.cerrarSlide();
            this.buscar();
        })

        ctn.append(
            this.formularioCreacion(obj),
            crear,
            cancelar
        );

        this.abrirSlide(ctn);
    }

    editar(obj = {}) {
        const ctn = $(`<div class="formulario"><h2>Editar</h2></div>`);

        const guardar = $(`<button class="boton boton-principal">Guardar</button>`);
        guardar.click(async () => {
            await this.repositorio.actualizar(obj);

            this.cerrarSlide();
            this.buscar({});
        })
        
        const eliminar = $(`<button class="boton">Eliminar</button>`);
        eliminar.click(async () => {
            await this.repositorio.remover(obj.id);

            this.cerrarSlide()
            this.buscar({});
        })
        
        const cancelar = $(`<button class="boton">Cancelar</button>`);
        cancelar.click(() => {
            this.cerrarSlide();            
            this.buscar({});
        })
        
        ctn.append(
            this.formularioEdicion(obj),
            guardar,
            eliminar,
            cancelar
        );

        this.abrirSlide(ctn);
    }
    
    eliminar(id) {
        return this.repositorio.remover(id)
    }

    _contenido() {
        const ctn = $('<div class="ancho pagina-crud"></div>');

        const cabecera = this.cabeceraBusqueda();
        cabecera.addClass('cabecera');

        ctn.append(cabecera, this.listado);
        
        return ctn;
    }
}