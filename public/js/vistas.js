class Navegacion {
    constructor(raizPaginas) {
        this.nav = document.createElement('nav');
        this.nav.classList.add('navegacion');

        this.paginas = {};
        this.raizPaginas = raizPaginas;
    }

    agregar(pagina) {
        const boton = document.createElement('button');

        boton.textContent = pagina.nombre.toUpperCase();        
        boton.onclick = () => this.seleccionar(pagina.nombre);
    
        this.nav.appendChild(boton);

        this.paginas[pagina.nombre] = {pagina, boton};
    }

    seleccionar(nombre) {
        if (!nombre in this.paginas) return;

        Object.values(this.paginas).forEach(pagina => {
            pagina.boton.classList.remove('seleccionado')
        });
        this.paginas[nombre].boton.classList.add('seleccionado');

        this.raizPaginas.innerHTML = '';
        this.raizPaginas.append(this.paginas[nombre].pagina.render());
    }

    render() { return this.nav }
}

class Pagina {
    constructor(nombre) {
        this.nombre = nombre;
        this.contenedor = document.createElement('div');
        this.contenedor.classList.add('pagina');
    }

    contenido(renderizador) { renderizador(this.contenedor); }

    render() { return this.contenedor }
}

class Buscador {
    constructor(repositorio, filtro, vista) {
        this.repositorio = repositorio;
        this.filtro = filtro;
        this.vista = vista;

        this.listado = document.createElement('div');
        this.listado.classList.add('listado');

        this.input = document.createElement('input');
        this.input.placeholder = 'Buscar ...';
        this.input.onkeypress = () => this.actualizarListado(this.input.value);
    }

    actualizarListado(query = "") {
        const resultados = this.repositorio.obtener(query, this.filtro);

        this.listado.innerHTML = '';

        resultados.forEach(resultado => {
            const contenedor = document.createElement('div');
            contenedor.classList.add('fila');
            this.vista(contenedor, resultado);
            this.listado.append(contenedor);
        });

        if (this.listado.childNodes.length === 0) {
            this.listado.textContent = 'No se han encontrado resultados';
        }
    }

    render() {
        this.actualizarListado("");
        
        const contenedor = document.createElement('div');
        contenedor.classList.add('buscador');

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
        const titulo = document.createElement('label');
        titulo.classList.add('titulo');
        titulo.textContent = campo.titulo ? campo.titulo : campo.nombre;

        const contenedor = document.createElement('div');
        contenedor.classList.add('campo');
        contenedor.appendChild(titulo);

        return contenedor;
    }

    crear_campo_input(campo, tipo) {
        const input = document.createElement('input');
        input.classList.add('input');
        input.type = tipo;
        if (campo.valor) {
            input.value = campo.valor;
            this.datos[campo.nombre] = input.value;
        }
        input.onchange = () => this.datos[campo.nombre] = input.value;
        input.onkeydown = () => this.datos[campo.nombre] = input.value;
        input.onkeypress = () => this.datos[campo.nombre] = input.value;

        const contenedor = this.crear_contenedor_campo(campo);
        contenedor.appendChild(input);

        return contenedor;
    }

    crear_campo_booleano(campo) {
        const input = document.createElement('input');
        input.classList.add('switch');
        input.type = 'checkbox';
        input.checked = campo.valor;
        this.datos[campo.nombre] = input.checked;
        input.onchange = () => this.datos[campo.nombre] = input.checked;

        const contenedor = this.crear_contenedor_campo(campo);
        contenedor.appendChild(input);

        return contenedor;
    }

    crear_campo_opciones(campo) {
        const opciones = document.createElement('select');
        opciones.classList.add('opciones');
        opciones.onchange = () => this.datos[campo.nombre] = opciones.value;

        const opcion = document.createElement('option');
        opcion.disabled = true;
        opcion.selected = true;
        opcion.textContent = 'Opciones';
        opciones.appendChild(opcion);

        campo.opciones.forEach(opcionData => {
            const opcion = document.createElement('option');
            opcion.value = opcionData.valor;
            opcion.textContent = opcionData.nombre;
            if (opcionData.selected) opcion.selected = opcionData.selected;
            opciones.appendChild(opcion);
        });

        if (campo.valor) opciones.value = campo.valor;

        const contenedor = this.crear_contenedor_campo(campo);
        contenedor.appendChild(opciones);

        return contenedor;
    }

    crear_campos() {
        const campos = document.createElement('div');
        campos.classList.add('campos');

        this.campos.forEach(campo => {
            switch (campo.tipo) {
                case 'texto':
                    campos.appendChild(this.crear_campo_input(campo, 'text'));
                    break;
                case 'numero':
                    campos.appendChild(this.crear_campo_input(campo, 'number'));
                    break;
                case 'booleano':
                    campos.appendChild(this.crear_campo_booleano(campo));
                    break;
                case 'opciones':
                    campos.appendChild(this.crear_campo_opciones(campo));
                    break;
            }
        });

        return campos;
    }

    crear_controles() {
        const guardar = document.createElement('button');
        guardar.classList.add('boton-guardar');
        guardar.textContent = 'Guardar';
        guardar.onclick = () => this.alGuardar(this.datos);

        const cancelar = document.createElement('button');
        cancelar.classList.add('boton-cancelar');
        cancelar.textContent = 'Cancelar';
        cancelar.onclick = () => this.alCancelar(this.datos);

        const borrar = document.createElement('button');
        borrar.classList.add('boton-borrar');
        borrar.textContent = 'Borrar';
        borrar.onclick = () => this.alBorrar(this.datos);

        const controles = document.createElement('div');
        controles.classList.add('controles');
        controles.append(guardar, cancelar, borrar);

        return controles;
    }

    render() {
        const contenedor = document.createElement('div');
        contenedor.classList.add('editor');

        const titulo = document.createElement('h3');
        titulo.classList.add('titulo-editor')
        titulo.textContent = this.titulo;

        contenedor.append(
            titulo, 
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

        this.editor = document.createElement('div');

        this.contenedor = document.createElement('div');
        this.contenedor.classList.add('crud-vista');
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
        this.editor.innerHTML = '';
        this.contenedor.classList.remove('edicion');
    }

    editorAbierto() { return this.contenedor.classList.contains('edicion') }

    editar(obj = {}) {
        if (this.editorAbierto()) this.cerrarEditor();

        const campos = [...this.camposObjeto];
        campos.forEach(campo => (campo.nombre in obj) ? (campo.valor = obj[campo.nombre]) : null);

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

        this.editor.innerHTML = '';
        this.editor.append(editor.render());

        this.contenedor.classList.add('edicion');
    }

    vistaItemBuscador(contenedor, obj) {
        this.camposBusqueda.forEach(campo => {
            const texto = document.createElement('label');
            texto.textContent = obj[campo];
            contenedor.appendChild(texto);
        })

        const editar = document.createElement('button');
        editar.textContent = 'editar';
        editar.onclick = () => this.editar(obj);

        const eliminar = document.createElement('button');
        eliminar.textContent = 'eliminar';
        eliminar.onclick = () => {
            this.repositorio.remover(obj);
            this.cerrarEditor();
            this.buscador.actualizarListado("");
        }

        contenedor.append(editar, eliminar);
    }

    botonCrear() {
        const button = document.createElement('button');
        button.classList.add('boton-nuevo');
        button.textContent = 'Nuevo';
        button.onclick = () => this.editar();
        return button;
    }

    render() { return this.contenedor }
}