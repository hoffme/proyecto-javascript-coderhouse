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
                console.log(this.valor);
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

        this.listado = $(`<div class="listado"></div>`);
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
            });

            contenedor.prepend(checkbox);

            this.listado.append(contenedor);
        });
    }

    contenido() {
        const contenedor = $(`<div class="seleccion"></div>`);

        const input = $(`<input class="input" placeholder="Buscar" type="text" />`);
        input.on("input", () => this.buscar(input.val()));

        contenedor.append(input, this.listado);

        this.buscar();

        return contenedor;
    }
}
