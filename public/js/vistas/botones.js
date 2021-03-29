function Boton({titulo, alClick, disabled}) {
    const boton = $(`<button class="boton">${titulo}</button>`);
    if (alClick) boton.click(() => alClick());
    if (disabled) input.prop('disabled', disabled);
    return boton;
}

function BotonPrincipal({titulo, alClick, disabled}) {
    const boton = Boton({titulo, alClick});
    boton.addClass('boton-principal');
    if (disabled) input.prop('disabled', disabled);
    return boton;
}