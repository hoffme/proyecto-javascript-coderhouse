function Campo({titulo}) {
    const contenedor = $('<div class="campo"></div>');
    if (titulo) contenedor.prepend(`<label class="titulo">${titulo}</label>`);
    return contenedor;
}

function Input({titulo, valor, tipo = 'text', alCambiar, placeholder, disabled}) {
    const campo = Campo({titulo});
    campo.addClass('campo-input');

    const input = $(`<input type="${tipo}" />`);
    if (valor) input.val(valor);
    if (placeholder) input.attr("placeholder", placeholder);
    if (disabled) input.prop('disabled', disabled);
    
    if (alCambiar) input.on("input", () => alCambiar(input.val()));

    campo.append(input);

    return campo;
}

function Texto({titulo, valor, alCambiar, placeholder, disabled}) {
    return Input({titulo, valor, alCambiar, placeholder, disabled});
}

function Numero({titulo, valor, alCambiar, placeholder, disabled}) {
    return Input({titulo, valor, alCambiar, tipo:'number', placeholder, disabled});
}

function Switch({titulo, valor, alCambiar, disabled}) {
    const contenedor = Campo({titulo});
    campo.addClass('campo-switch');

    const input = $(`<input type="checkbox" />`);
    if (valor) input.val(valor);
    if (alCambiar) input.change(() => alCambiar(input.prop("checked")));
    if (disabled) input.prop('disabled', disabled);

    const switchCtn = $(`<label class="switch">
        <span class="switch-slider"></span>
    </label>`);
    
    switchCtn.prepend(input);
    contenedor.append(switchCtn);

    return contenedor;
}

function Seleccion({titulo, valor, alCambiar, opciones, disabled}) {
    const contenedor = Campo({titulo});
    contenedor.addClass('campo-opciones');
    
    const select = $(`<select class="opciones"></select>`);
    if (alCambiar) select.change(() => alCambiar(select.val()));
    if (disabled) input.prop('disabled', disabled);

    select.prepend('<option disabled selected>Opciones</option>');

    if (opciones) {
        opciones.forEach(opcion => {
            select.append(`
                <option
                    ${opcion.selected ? `selected="${opcion.selected}"` : ''}
                    value="${opcion.valor}"
                    class="opciones-opcion"
                >
                    ${opcion.titulo}
                </option>`
            );
        });
    }

    if (valor) select.val(valor);

    contenedor.append(select);

    return contenedor;
}

