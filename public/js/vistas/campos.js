function Campo({titulo}) {
    const contenedor = $('<div class="campo"></div>');
    if (titulo) contenedor.prepend(`<label class="titulo">${titulo}</label>`);
    return contenedor;
}

function Input({titulo, valor, tipo = 'text', alCambiar}) {
    const campo = Campo({titulo});

    const input = $(`<input class="input" type="${tipo}" />`);
    if (valor) input.val(campo.valor);
    
    if (alCambiar) {
        const actualizarValor = () => alCambiar(input.val());

        input.change(actualizarValor);
        input.keydown(actualizarValor);
        input.keypress(actualizarValor);
    }

    campo.append(input);

    return campo;
}

function Texto({titulo, valor, alCambiar}) {
    return Input({titulo, valor, alCambiar});
}

function Numero({titulo, valor, alCambiar}) {
    return Input({titulo, valor, alCambiar, tipo:'number'});
}

function Switch({titulo, valor, alCambiar}) {
    const contenedor = Campo({titulo});

    const input = $(`<input type="checkbox" />`);
    if (valor) input.val(valor);
    if (alCambiar) input.onchange = () => alCambiar(input.val());

    const switchCtn = $(`<label class="switch">
        <span class="switch-slider"></span>
    </label>`);
    
    switchCtn.prepend(input);
    contenedor.append(switchCtn);

    return contenedor;
}

function Seleccion({titulo, valor, alCambiar, opciones}) {
    const contenedor = Campo({titulo});
    
    const select = $(`<select class="opciones"></select>`);
    if (alCambiar) select.change(() => alCambiar(opciones.val()));

    select.prepend('<option disabled selected>Opciones</option>');

    if (opciones) {
        opciones.forEach(opcion => {
            select.append(`
                <option
                    ${opcion.selected ? `selected="${opcion.selected}"` : ''}
                    value="${opcion.valor}"
                >
                    ${opcion.nombre}
                </option>`
            );
        });
    }

    if (valor) select.val(campo.valor);

    contenedor.append(select);

    return contenedor;
}