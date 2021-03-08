class Navegacion {
    constructor(raizPaginas) {
        this.nav = $('<nav class="navegacion"></nav>');

        this.paginas = {};
        this.raizPaginas = raizPaginas;
    }

    agregar(pagina) {
        const boton = $(`<button>${pagina.nombre.toUpperCase()}</button>`);
        boton.click(() => this.seleccionar(pagina.nombre));
    
        this.nav.append(boton);
        this.paginas[pagina.nombre] = {pagina, boton};
    }

    seleccionar(nombre) {
        if (!nombre in this.paginas) return;

        Object.values(this.paginas).forEach(pagina => {
            pagina.boton.removeClass('seleccionado')
        });
        this.paginas[nombre].boton.addClass('seleccionado');

        this.raizPaginas.empty();
        this.raizPaginas.append(this.paginas[nombre].pagina.render());
    }

    render() { return this.nav }
}

class Pagina {
    constructor(nombre) {
        this.nombre = nombre;
        this.contenedor = $('<div class="pagina"></div>');
    }

    contenido(renderizador) { renderizador(this.contenedor); }

    render() { return this.contenedor }
}

class Buscador {
    constructor(repositorio, filtro, vista) {
        this.repositorio = repositorio;
        this.filtro = filtro;
        this.vista = vista;

        this.listado = $('<div class="listado"></div>');

        this.input = $('<input placeholder="Buscar ..." />');
        this.input.keypress(() => this.actualizarListado(this.input.value));
    }

    actualizarListado(query = "") {
        this.listado.empty();

        const resultados = this.repositorio.obtener(query, this.filtro);

        resultados.forEach(resultado => {
            const contenedor = $('<div class="fila"/></div>');
            this.vista(contenedor, resultado);
            this.listado.append(contenedor);
        });

        if (this.listado.is(':empty')) {
            this.listado.text('No se han encontrado resultados');
        }
    }

    render() {
        this.actualizarListado("");
        
        const contenedor = $('<div class="buscador"></div>');
        contenedor.append(this.input, this.listado);
    
        return contenedor;
    }
}

class Editor {
    constructor(titulo, campos) {
        // [
        //     {
        //         titulo: string,
        //         nombre: string,
        //         tipo: 'texto' || 'numero' || 'booleano' || 'opciones',
        //         valor: string || number || boolean,

        //         --opciones
        //         opciones: [
        //             {
        //                 nombre: string
        //                 valor: string || number
        //             }
        //         ]
        //     }
        // ]

        this.titulo = titulo;
        this.campos = campos;
        this.datos = {};

        this.alGuardar = () => {}
        this.alCancelar = () => {}
        this.alBorrar = () => {}
    }

    crear_contenedor_campo(campo) {
        const contenedor = $('<div class="campo"></div>');
        contenedor.prepend(`<label class="titulo">${campo.titulo}</label>`);
        return contenedor;
    }

    crear_campo_input(campo, tipo) {
        const contenedor = this.crear_contenedor_campo(campo);

        const input = $(`<input class="input" type="${tipo}" />`);
        
        const actualizarValor = () => this.datos[campo.nombre] = input.val();

        if (campo.valor) {
            input.val(campo.valor);
            actualizarValor()
        }
        input.change(actualizarValor);
        input.keydown(actualizarValor);
        input.keypress(actualizarValor);

        contenedor.append(input);

        return contenedor;
    }

    crear_campo_booleano(campo) {
        const contenedor = this.crear_contenedor_campo(campo);

        const input = $(`<input class="switch" type="checkbox" checked="${campo.valor}" />`);
        input.onchange = () => this.datos[campo.nombre] = input.checked;
        
        contenedor.append(input);

        return contenedor;
    }

    crear_campo_opciones(campo) {
        const contenedor = this.crear_contenedor_campo(campo);
        
        const opciones = $(`<select class="opciones"></select>`);
        opciones.change(() => this.datos[campo.nombre] = opciones.val());

        opciones.prepend('<option disabled selected>Opciones</option>');

        campo.opciones.forEach(data => {
            opciones.append(`
                <option
                    ${data.selected ? `selected="${data.selected}"` : ''}
                    value="${data.valor}"
                >
                    ${data.nombre}
                </option>`
            );
        });

        if (campo.valor) opciones.val(campo.valor);

        contenedor.append(opciones);

        return contenedor;
    }

    crear_campos() {
        const campos = $('<div class="campos"></div>');

        this.campos.forEach(campo => {
            switch (campo.tipo) {
                case 'texto':
                    campos.append(this.crear_campo_input(campo, 'text'));
                    break;
                case 'numero':
                    campos.append(this.crear_campo_input(campo, 'number'));
                    break;
                case 'booleano':
                    campos.append(this.crear_campo_booleano(campo));
                    break;
                case 'opciones':
                    campos.append(this.crear_campo_opciones(campo));
                    break;
            }
        });

        return campos;
    }

    crear_controles() {
        const controles = $('<div class="controles"></div>');

        const guardar = $('<button class="boton-guardar">Guardar</button>');
        guardar.click(() => this.alGuardar(this.datos));

        const cancelar = $('<button class="boton-cancelar">Cancelar</button>');
        cancelar.click(() => this.alCancelar(this.datos));

        const borrar = $('<button class="boton-borrar">Borrar</button>');
        borrar.click(() => this.alBorrar(this.datos));
        
        controles.append(guardar, cancelar, borrar);

        return controles;
    }

    render() {
        const contenedor = $(`<div class="editor">
            <h3 class="titulo-editor">${this.titulo}</h3>
        </div>`);

        contenedor.append(
            this.crear_campos(), 
            this.crear_controles()
        );

        return contenedor;
    }
}

class CRUDVista {
    constructor(repositorio, camposFiltro, camposBusqueda, camposObjeto) {
        this.repositorio = repositorio;
        this.camposFiltro = camposFiltro;
        this.camposBusqueda = camposBusqueda;
        this.camposObjeto = camposObjeto;

        this.buscador = new Buscador(
            repositorio,
            (...p) => this.filtroBuscador(...p),
            (...p) => this.vistaItemBuscador(...p)
        );

        this.editor = $('<div></div>');

        this.contenedor = $('<div class="crud-vista"></div>')
        this.contenedor.append(
            this.botonCrear(),
            this.buscador.render(),
            this.editor
        );
    }

    filtroBuscador(query, obj) {
        for (const campo of this.camposFiltro) {
            if (campo in obj && obj[campo].toLowerCase().includes(query.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    cerrarEditor() {
        this.editor.empty();
        this.contenedor.removeClass('edicion');
    }

    editar(obj = {}) {
        if (this.contenedor.hasClass('edicion')) this.cerrarEditor();

        const campos = [...this.camposObjeto];
        campos.forEach(campo => campo.valor = obj[campo.nombre]);

        console.log(campos)

        const editor = new Editor('Editar', campos)
        editor.alGuardar = datos => {
            this.repositorio.crear(datos, true);
            this.cerrarEditor();
            this.buscador.actualizarListado("");
        }
        editor.alCancelar = () => this.cerrarEditor();
        editor.alBorrar = datos => {
            this.repositorio.remover(datos);
            this.cerrarEditor();
            this.buscador.actualizarListado("");
        }

        this.editor.empty();
        this.editor.append(editor.render());

        this.contenedor.addClass('edicion');
    }

    vistaItemBuscador(ctn, obj) {
        this.camposBusqueda.forEach(campo => ctn.append(`<label>${obj[campo]}</label>`));

        const editar = $('<button>Editar</button>');
        editar.click(() => this.editar(obj));

        const eliminar = $('<button>Eliminar</button>')
        eliminar.click(() => {
            this.repositorio.remover(obj);
            this.cerrarEditor();
            this.buscador.actualizarListado("");
        });

        ctn.append(editar, eliminar);
    }

    botonCrear() {
        const button = $('<button class="boton-nuevo">Nuevo</button>')
        button.click(() => this.editar());
        return button;
    }

    render() { return this.contenedor }
}