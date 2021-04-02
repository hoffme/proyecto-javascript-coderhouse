class Campo {
    constructor(titulo, valor = null, alCambiar = () => {}, estilo = '') {
        this.titulo = titulo;
        this.valor = valor;
        this.alCambiar = alCambiar;

        this.contenedor = $(`<div class="campo ${estilo}"></div>`);
    }

    contenido() { return null }

    render() {
        this.contenedor.empty();

        if (this.titulo) {
            this.contenedor.prepend(`<label class="titulo">${this.titulo}</label>`);
        }
        this.contenedor.append(this.contenido());

        return this.contenedor;
    }
}

class Input extends Campo {
    static Texto({ titulo, valor, alCambiar, placeholder, disabled }) {
        return new Input({
            titulo, 
            valor, 
            alCambiar
        }, {
            type: 'text',
            placeholder,
            disabled
        });
    }

    static Numero({ titulo, valor, alCambiar, placeholder, disabled }) {
        return new Input(
            {
                titulo, 
                valor, 
                alCambiar
            }, {
                type: 'number',
                placeholder,
                disabled
            }
        );
    }

    static Booleano({ titulo, valor, alCambiar, disabled }) {
        const input_wrapper = input => {
            const contenedor = $(`<label class="switch">
                <span class="switch-slider"></span>
            </label>`);
            
            contenedor.prepend(input);

            return contenedor;
        };
        
        const input_value = input => input.prop('checked');

        return new Input(
            {
                titulo, 
                valor, 
                alCambiar,
                estilo: 'campo-switch',
                input_wrapper,
                input_value
            }, {
                type: 'checkbox',
                checked: valor,
                disabled
            }
        );
    }

    constructor(
        {
            titulo, 
            valor, 
            alCambiar,
            estilo,
            input_wrapper = i => i, 
            input_value = i => i.val()
        },
        propiedades
    ) {
        super(titulo, valor, alCambiar, estilo ? estilo : 'campo-input');

        this.propiedades = propiedades;
        this.input_wrapper = input_wrapper;
        this.input_value = input_value;
    }

    contenido() {
        const input = $(`<input class="input"/>`);
        
        if (this.valor) input.val(this.valor);
        if (this.alCambiar) {
            input.on("input", () => {
                this.valor = input.val();
                this.alCambiar(this.valor);
            });
        }

        Object.entries(this.propiedades).forEach(([propiedad, valor]) => {
            input.prop(propiedad, valor);
        })

        return this.input_wrapper(input);
    }
}

class Seleccion extends Campo {
    static async _buscadorOpciones(opciones, texto) {
        if (!texto || texto.length === 0) return opciones;

        return Object.entries(opciones).reduce((resultado, [id, titulo]) => {
            if (titulo.toLowerCase().includes(texto.toLowerCase())) {
                resultado[id] = titulo;
            }
            return resultado;
        }, {});
    }

    static Consulta({ titulo, valor, alCambiar, multiple = false, consulta, desactivado }) {
        return new Seleccion(
            {
                titulo,
                valor: valor ? valor : [],
                alCambiar,
                multiple,
                buscador: consulta
            }, { desactivado }
        );
    }

    static Opciones({ titulo, valor, alCambiar, multiple = false, opciones, desactivado }) {
        return new Seleccion(
            {
                titulo,
                valor: valor ? valor : [],
                alCambiar,
                multiple,
                buscador: texto => Seleccion._buscadorOpciones(opciones, texto)
            }, { desactivado }
        );
    }

    constructor(
        {
            titulo, 
            valor, 
            alCambiar,
            multiple,
            buscador
        },
        propiedades
    ) {
        super(titulo, valor, alCambiar, 'campo-seleccion');

        this.propiedades = propiedades;
        this.multiple = multiple;
        this.buscador = buscador;

        this.contenedor_valor = $(`<label class="valor">-<label>`);
        this.contenedor_valor.html(
            this.valor.length === 0 ? 
                '-' :
                this.valor.join(' - ')
        )


        this.contenedor_listado = $(`<div class="contenedor-listado"></div>`);

        const input = $(`<input class="input" placeholder="Buscar" type="text" />`);
        input.on("input", () => this.buscar(input.val()));

        this.listado = $(`<div class="listado"></div>`);

        this.contenedor_listado.append(input, this.listado);
    }

    async buscar(texto) {
        const resultados = await this.buscador(texto);

        this.listado.empty();
        
        const nombreGrupo = `grupo-seleccion-${Math.floor(Math.random() * 1000)}`;

        Object.entries(resultados).forEach(([id, titulo]) => {
            const contenedor = $(`<label>${titulo}</label>`);

            const checked = this.valor.indexOf(id) > -1;

            const checkbox = $(`<input type="checkbox" id="${nombreGrupo}-${id}" name="${nombreGrupo}" />`);
            checkbox.prop('checked', checked);
            checkbox.change(() => {
                if (checkbox.prop('checked')) {
                    if (this.multiple) this.valor.push(id);
                    else this.valor = [id];
                } else this.valor.splice(this.valor.indexOf(id), 1);

                $(`input:checkbox[name='${nombreGrupo}']`).prop('checked', false);
                this.valor.forEach(id => {
                    $(`input:checkbox[id='${nombreGrupo}-${id}']`).prop('checked', true);
                })

                if (this.alCambiar) this.alCambiar(this.valor);
                this.contenedor_valor.html(
                    this.valor.length === 0 ? 
                        '-' :
                        this.valor.join(' - ')
                )
            });

            contenedor.prepend(checkbox);

            this.listado.append(contenedor);
        });
    }

    contenido() {
        this.valor = this.valor ? this.valor : [];

        this.contenedor_valor.click(e => {
            e.stopPropagation();
            if (this.contenedor_listado.is(":visible")) return;

            this.contenedor_listado.show();
            this.buscar();

            const cerrar_listado = () => {
                this.contenedor_listado.hide();
                window.removeEventListener('click', cerrar_listado);
            }

            window.addEventListener('click', cerrar_listado);
        })

        this.contenedor_listado.click(e => e.stopPropagation());

        this.contenedor_listado.hide();

        return [ this.contenedor_valor, this.contenedor_listado, ];
    }
}

class Arreglo extends Campo {
    constructor(
        {
            titulo, 
            valor,
            alCambiar,
            vista,
            formulario_creacion = new Formulario({}),
            formulario_edicion = new Formulario({})
        },
        propiedades
    ) {
        super(titulo, valor ? valor : [], alCambiar, 'campo-arreglo');

        this.propiedades = propiedades;

        this.vista = vista;

        this.formulario_creacion = formulario_creacion;
        this.formulario_creacion.alGuardar = datos => {
            this.valor.push(datos);
            this.cerrar_formulario();
        }
        this.formulario_creacion.alCancelar = () => this.cerrar_formulario();

        this.formulario_edicion = formulario_edicion;
        this.formulario_creacion.alCancelar = () => this.cerrar_formulario();

        this.contenedor_formulario = $(`<div class="contenedor-formulario"></div>`);


        this.listado = $(`<div class="listado"></div>`);

        const boton_nuevo = $(`<button class="boton boton-nuevo">Agregar</button>`);
        boton_nuevo.click(() => {
            this.formulario_creacion.datos = {};
            
            this.contenedor_formulario.empty();
            this.contenedor_formulario.append(this.formulario_creacion.render());

            this.contenedor_listado.hide();
            this.contenedor_formulario.show();
        });
        
        this.contenedor_listado = $(`<div class="contenedor-listado"></div>`);
        this.contenedor_listado.append(this.listado, boton_nuevo);
    }

    editar(datos) {
        const indice = this.valor.indexOf(datos);

        this.formulario_edicion.datos = { ...datos };
        this.formulario_edicion.alGuardar = nuevos_datos => {
            this.valor[indice] = nuevos_datos;
            this.cerrar_formulario();
        }
        this.formulario_edicion.alEliminar = () => {
            this.valor.splice(indice, 1);
            this.cerrar_formulario();
        }

        this.contenedor_formulario.empty();
        this.contenedor_formulario.append(this.formulario_edicion.render());
        
        this.contenedor_listado.hide();
        this.contenedor_formulario.show();
    }

    cerrar_formulario() {
        this.contenedor_formulario.hide();
        this.contenedor_listado.show();
        this.actualizar_valores();
    }

    async actualizar_valores() {
        this.listado.empty();

        this.valor.forEach(obj => {
            const fila = $(`<div class="fila"></div>`);

            const boton_editar = $(`<button class="boton-editar">Editar</button>`)
            boton_editar.click(() => this.editar(obj));

            const contenedor_vista = $(`<div class="datos"></div>`);
            contenedor_vista.append(this.vista(obj));

            fila.append(contenedor_vista, boton_editar);
            
            this.listado.append(fila);
        });

        if (this.valor.length === 0) {
            this.listado.append($('<label>No hay elementos</label>'));
        }
    }

    contenido() {
        this.valor = this.valor ? this.valor : [];

        this.contenedor_formulario.hide();
        this.contenedor_listado.show();
        
        this.actualizar_valores();

        return [
            this.contenedor_listado, 
            this.contenedor_formulario
        ];
    }
}

class Formulario {
    constructor({ titulo, datos = {}, campos, alGuardar, alEliminar, alCancelar }) {
        this.titulo = titulo;
        this.datos = datos;
        this.campos = campos;
        this.alGuardar = alGuardar;
        this.alEliminar = alEliminar;
        this.alCancelar = alCancelar;
    }

    render() {
        const ctn = $(`<div class="formulario"></div>`);

        if (this.titulo) { ctn.prepend(`<h2>${this.titulo}</h2>`) }

        Object.entries(this.campos).forEach(([clave, campo]) => {
            campo.valor = this.datos[clave];
            campo.alCambiar = dato => this.datos[clave] = dato;
            
            ctn.append(campo.render());
        });

        if (this.alGuardar) {
            const boton_guardar = $(`<button class="boton boton-principal">Guardar</button>`);
            boton_guardar.click(() => this.alGuardar(this.datos));
            ctn.append(boton_guardar);
        }

        if (this.alEliminar) {
            const boton_eliminar = $(`<button class="boton">Eliminar</button>`);
            boton_eliminar.click(() => this.alEliminar(this.datos));
            ctn.append(boton_eliminar);
        }

        if (this.alCancelar) {
            const boton_cancelar = $(`<button class="boton">Cancelar</button>`);
            boton_cancelar.click(() => this.alCancelar(this.datos));
            ctn.append(boton_cancelar);
        }

        return ctn;
    }
}