class Crud extends Pagina {
    constructor(nombre, repositorio) {
        super(nombre);
        this.repositorio = repositorio;
        this.listado = $(`<div class="listado"><div>`);

        this.buscar();
    }

    // metodos abstractos

    filtroBusqueda(filtro, dato) { return false }

    filaCabecera() { return null }

    fila(fila) { return null }

    cabeceraBusqueda(contenedor) { }

    formularioCreacion(datos) { return null }

    formularioEdicion(datos) { return null }

    // metodos concretos

    eliminar(id) { return this.repositorio.remover(id) }

    editar(obj = {}) {
        const ctn = $(`<div class="formulario">
            <h2>Editar</h2>
        </div>`);

        ctn.append(this.formularioEdicion(obj));

        ctn.append(BotonPrincipal({ titulo: 'Guardar', alClick: async () => {
            await this.repositorio.actualizar(obj);

            this.cerrarSlide();
            this.buscar({});
        } }));
        
        ctn.append(Boton({ titulo: 'Eliminar', alClick: async () => {
            await this.repositorio.remover(obj.id);

            this.cerrarSlide()
            this.buscar({});
        } }));
        
        ctn.append(Boton({ titulo: 'Cancelar', alClick: () => {
            this.cerrarSlide();            
            this.buscar({});
        } }));

        this.abrirSlide(ctn);
    }

    crear() {
        const obj = {};

        const ctn = $(`<div class="formulario">
            <h2>Crear</h2>
        </div>`);

        ctn.append(this.formularioCreacion(obj));

        ctn.append(BotonPrincipal({ titulo: 'Crear', alClick: async () => {
            await this.repositorio.crear(obj);

            this.cerrarSlide();
            this.buscar({});
        } }));
        
        ctn.append(Boton({ titulo: 'Cancelar', alClick: () => {
            this.cerrarSlide();
            this.buscar({});
        } }));

        this.abrirSlide(ctn);
    }

    async buscar(filtro) {
        this.listado.empty();
        
        const resultados = await this.repositorio.obtener(filtro);

        if (resultados && resultados.length > 0) {
            const cabecera = this.filaCabecera();
            if (cabecera) {
                cabecera.addClass('listado-cabecera');
                this.listado.append(cabecera);
            }
        } else {
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

    _contenido() {
        const ctn = $('<div class="ancho pagina-crud"></div>');

        const cabecera = $('<div class="cabecera"><div>');
        this.cabeceraBusqueda(cabecera);

        ctn.append(cabecera, this.listado);
        
        return ctn;
    }
}