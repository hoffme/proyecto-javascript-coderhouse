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