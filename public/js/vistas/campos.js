function Campo({titulo}) {
    const contenedor = $('<div class="campo"></div>');
    if (titulo) contenedor.prepend(`<label class="titulo">${titulo}</label>`);
    return contenedor;
}

function Input({titulo, valor, tipo = 'text', alCambiar, placeholder}) {
    const campo = Campo({titulo});
    campo.addClass('campo-input');

    const input = $(`<input type="${tipo}" />`);
    if (valor) input.val(campo.valor);
    if (placeholder) input.attr("placeholder", placeholder);
    
    if (alCambiar) {
        const actualizarValor = () => alCambiar(input.val());

        input.change(actualizarValor);
        input.keydown(actualizarValor);
        input.keypress(actualizarValor);
    }

    campo.append(input);

    return campo;
}

function Texto({titulo, valor, alCambiar, placeholder}) {
    return Input({titulo, valor, alCambiar, placeholder});
}

function Numero({titulo, valor, alCambiar, placeholder}) {
    return Input({titulo, valor, alCambiar, tipo:'number', placeholder});
}

function Switch({titulo, valor, alCambiar}) {
    const contenedor = Campo({titulo});
    campo.addClass('campo-switch');

    const input = $(`<input type="checkbox" />`);
    if (valor) input.val(valor);
    if (alCambiar) input.change(() => alCambiar(input.prop("checked")));

    const switchCtn = $(`<label class="switch">
        <span class="switch-slider"></span>
    </label>`);
    
    switchCtn.prepend(input);
    contenedor.append(switchCtn);

    return contenedor;
}

function Seleccion({titulo, valor, alCambiar, opciones}) {
    const contenedor = Campo({titulo});
    campo.addClass('campo-opciones');
    
    const select = $(`<select class="opciones"></select>`);
    if (alCambiar) select.change(() => alCambiar(select.val()));

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

    if (valor) select.val(campo.valor);

    contenedor.append(select);

    return contenedor;
}

function Boton({titulo, alClick}) {
    const boton = $(`<div class="boton">${titulo}</div>`);
    if (alClick) boton.click(() => alClick());
    return boton;
}

function BotonPrincipal({titulo, alClick}) {
    const boton = Boton({titulo, alClick});
    boton.addClass('boton-principal');
    return boton;
}