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
            buscador,
            vista,
            formulario,
        },
        propiedades
    ) {
        super(titulo, valor ? valor : [], alCambiar, 'campo-arreglo');

        this.propiedades = propiedades;

        this.buscador = buscador;
        this.vista = vista;
        this.formulario = formulario;


        this.contenedor_listado = $(`<div class="contenedor-listado"></div>`);

        if (this.buscador) {
            const input_buscador = $(`<input class="input" placeholder="Buscar" type="text" />`);
            input_buscador.on("input", () => this.buscar(input.val()));
            this.contenedor_listado.append(input_buscador);
        }

        this.listado = $(`<div class="listado"></div>`);
        this.contenedor_listado.append(this.listado);

        const boton_nuevo = $(`<button class="boton boton-nuevo">Nuevo</button>`);
        boton_nuevo.click(() => this.editar());
        this.contenedor_listado.append(boton_nuevo);


        this.contenedor_formulario = $(`<div class="contenedor-formulario"></div>`);
    }

    editar(datos) {
        this.contenedor_formulario.empty();
        
        const datos_copia = { ...datos };

        const indice = this.valor.indexOf(datos);
        const formulario = this.formulario(datos_copia);

        const controles = $('<div class="controles"></div>');

        const boton_guardar = $(`<button class="boton boton-principal">Guardar</button>`);
        boton_guardar.click(() => {
            this.guardar(datos_copia, indice);
            this.cerrar_formulario();
        })

        const boton_eliminar = $(`<button class="boton">Eliminar</button>`);
        boton_eliminar.click(() => {
            this.remover(indice);
            this.cerrar_formulario();
        })

        const boton_cancelar = $(`<button class="boton">Cancelar</button>`);
        boton_cancelar.click(() => {
            this.cerrar_formulario();
        })

        controles.append(boton_guardar, boton_eliminar, boton_cancelar)
        this.contenedor_formulario.append(formulario, controles);

        this.contenedor_listado.hide();
        this.contenedor_formulario.show();
    }

    cerrar_formulario() {
        this.contenedor_formulario.hide();
        this.contenedor_listado.show();
        this.buscar();
    }

    guardar(datos_nuevos, indice) {
        if (indice != 0 && (!indice || indice < 0 || indice >= this.valor.length)) this.valor.push(datos_nuevos);
        else this.valor[indice] = datos_nuevos;

        this.alCambiar(this.valor);
    }

    remover(indice) {
        this.valor.splice(indice, 1);
        this.alCambiar(this.valor);
    }

    async buscar(texto) {
        const resultados = this.buscador ? 
            await this.buscador(texto, this.valor) : 
            this.valor;

        this.listado.empty();

        resultados.forEach(obj => {
            const fila = $(`<div class="fila"></div>`);

            const boton_editar = $(`<button class="boton-editar">Editar</button>`)
            boton_editar.click(() => this.editar(obj));

            const contenedor_vista = $(`<div class="datos"></div>`);
            contenedor_vista.append(this.vista(obj));

            fila.append(contenedor_vista, boton_editar);
            
            this.listado.append(fila);
        });
        if (resultados.length === 0) {
            this.listado.append($('<label>No hay elementos</label>'));
        }
    }

    contenido() {
        this.contenedor_formulario.hide();
        this.contenedor_listado.show();
        
        this.buscar();

        return [
            this.contenedor_listado, 
            this.contenedor_formulario
        ];
    }
}