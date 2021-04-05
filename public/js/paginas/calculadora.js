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
                { titulo: 'Subrecetas', valor: this.calculadora.subRecetas().length },
                { titulo: 'Pasos', valor: this.calculadora.receta.pasos.length },
                { titulo: 'Costo Menor (Materia Prima)', valor: `$ ${this.calculadora.costoMenor()}` },
                { titulo: 'Costo Mayor (Materia Prima)', valor: `$ ${this.calculadora.costoMayor()}` },
                {
                    titulo: 'Tiempo de Preparacion',
                    valor: this.calculadora.pasos().reduce((total, paso) => {
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
        const resultadosContenedor = $(`<div class="resultados"></div>`);

        const camposVariaciones = Object.values(this.calculadora.ingredientes()).reduce((campos, ingrediente) => {
            let variaciones = [];
            if (ingrediente.ingrediente.variaciones) {
                variaciones = ingrediente.ingrediente.variaciones.map((dat, indice) => {
                    return { valor: indice, titulo: `${dat.marca} - ${dat.cantidad} ${dat.medida} - $${dat.precio}` }
                })
            }

            campos[ingrediente.ingrediente.id] = Seleccion.Opciones({
                titulo: ingrediente.ingrediente.nombre,
                opciones: variaciones
            })

            return campos;
        }, {});

        const formulario = new Formulario({
            campos: camposVariaciones,
            alGuardar: (datos) => this.mostrarResultados(resultadosContenedor, datos)
        })

        const contenedorFormulario = $(`<div class="formulario-calculadora-costos"></div>`);
        contenedorFormulario.append(formulario.render());

        this.mostrarResultados(resultadosContenedor, {});

        return new CampoContenedor('Calculadora de Costo', [
            resultadosContenedor,
            contenedorFormulario
        ]).render();
    }

    mostrarResultados(ctn, datos) {
        ctn.empty();
        const costo = this.calculadora.costoConVariaciones(datos);
        ctn.append(`<h3>Costo de Materia Prima: $${costo}</h3>`);
    }
}