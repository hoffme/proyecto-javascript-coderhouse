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

        this.editor = null;
        this.contenedor = $('<div class="crud-vista"></div>')
        this.contenedor.append(
            this.botonCrear(),
            this.buscador.render()
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
        const editor = this.editor;

        if (!editor || this.contenedor.children().length <= 2) return;
        editor.animate({ width: 0 }, "fast", () => editor.remove());
    }

    editar(obj = {}) {
        this.cerrarEditor();

        const campos = [...this.camposObjeto];
        campos.forEach(campo => campo.valor = obj[campo.nombre]);

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

        this.editor = editor.render();
        this.contenedor.append(this.editor);
        this.editor.animate({ width: '100%' }, "fast");
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