function sumarTiempos(tiempo_a, tiempo_b) {
    const [min_a, seg_a] = tiempo_a.split(':');
    const [min_b, seg_b] = tiempo_b.split(':');
    
    let min = parseInt(min_a) + parseInt(min_b);
    let seg = parseInt(seg_a) + parseInt(seg_b);

    if (seg < 60) {
        min += Math.round(seg / 60);
        seg = seg % 60;
    }

    return `${min < 10 ? '0' : ''}${min}:${seg < 10 ? '0' : ''}${seg}`
}

class PaginaCalculadora extends Pagina {
    constructor(repoRecetas) {
        super('Calculadora');

        this.repoRecetas = repoRecetas;

        this.contenido = $(`<div class="contenido-calculadora"></div>`);

        this.calculadora = new CalculadoraRecetas({});
    }

    _contenido() {
        const contenedor = $(`<div class="ancho"></div>`);

        contenedor.append(
            new Seleccion({
                titulo: 'Seleccione una Receta',
                alCambiar: receta => this.seleccionarReceta(receta),
                buscador: async texto => {
                    return await this.repoRecetas.obtener({ __contiene__: { nombre: texto } });
                },
                metaValor: receta => { return { titulo: receta.nombre } }
            }).render(),
            this.contenido
        )

        return contenedor;
    }

    seleccionarReceta(receta) {
        this.contenido.empty();
        this.calculadora = new CalculadoraRecetas(receta);

        this.contenido.append(
            this.info(),
            this.personalizacion(),
        )
    }

    info() {
        const ctn = $(`<div class="info-receta"></div>`)
    
        ctn.append(
            new CampoInformacion('Informacion', [
                { titulo: 'Nombre', valor: this.calculadora.receta.nombre },
                { titulo: 'Pasos', valor: this.calculadora.pasos().length },
                { titulo: 'Subrecetas', valor: this.calculadora.subRecetas().length },
                {
                    titulo: 'Tiempo de Preparacion',
                    valor: this.calculadora.pasos().reduce((total, paso) => {
                        console.log(total, paso.tiempo, paso);
                        return paso.tiempo ? sumarTiempos(total, paso.tiempo) : total;
                    }, '00:00')
                },
                {
                    titulo: 'Tiempo de Trabajo',
                    valor: this.calculadora.pasos().reduce((total, paso) => {
                        return paso.tiempoTrabajo ? sumarTiempos(total, paso.tiempoTrabajo) : total;
                    }, '00:00')
                }
            ]).render()
        );

        return ctn;
    }

    personalizacion() {
        return null;
    }
}