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

const tiempoAHoras = (tiempo) => {
    const [minutos, segundos] = tiempo.split(':');
    return (parseInt(minutos) / 60) + (parseInt(segundos) / 3600);
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
            this.costoMateriaPrima(),
            this.costoServicios(),
            this.costoManoDeObra()
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

    costoMateriaPrima() {
        const resultadosContenedor = $(`<div class="resultados">
            <h3>Costo de Materia Prima: -</h3>
        </div>`);

        const mostrarResultados = (datos) => {
            resultadosContenedor.empty();
            const costo = this.calculadora.costoMateriaPrima(datos);
            resultadosContenedor.append(`<h3>Costo de Materia Prima: $${costo}</h3>`);
        }

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
            alGuardar: (datos) => mostrarResultados(datos)
        })

        const contenedorFormulario = $(`<div class="formulario-calculadora-costos"></div>`);
        contenedorFormulario.append(formulario.render());

        return new CampoContenedor('Calculadora de Costo Materia Prima', [
            resultadosContenedor,
            contenedorFormulario
        ]).render();
    }

    costoServicios() {
        const resultadosContenedor = $(`<div class="resultados">
            <h3>Costo de Electricidad: -</h3>
            <h3>Costo de Gas: -</h3>
        </div>`);

        const mostrarResultados = (precio) => {
            resultadosContenedor.empty();

            const { electricidad, gas } = this.calculadora.consumoHerramientas();

            resultadosContenedor.append(`
                <h3>Costo de Electricidad: $${electricidad * (precio.electricidad ? precio.electricidad : 0)}</h3>
                <h3>Costo de Gas: $${gas * (precio.gas ? precio.gas : 0)}</h3>
            `);
        }

        const formulario = new Formulario({
            campos: {
                electricidad: Input.Texto({ titulo: 'Electricidad', placeholder: '$/kw' }),
                gas: Input.Texto({ titulo: 'Gas', placeholder: '$/cm3' }),
            },
            alGuardar: (datos) => mostrarResultados(datos)
        })

        const contenedorFormulario = $(`<div class="formulario-calculadora-costos"></div>`);
        contenedorFormulario.append(formulario.render());

        return new CampoContenedor('Calculadora de Costo Servicios', [
            resultadosContenedor,
            contenedorFormulario
        ]).render();
    }

    costoManoDeObra() {
        const resultadosContenedor = $(`<div class="resultados">
            <h3>Costo de Mano de obra: -</h3>
        </div>`);

        const mostrarResultados = (sueldoHora) => {
            resultadosContenedor.empty();

            const tiempoTrabajo = this.calculadora.pasos().reduce((total, paso) => {
                return paso.tiempoTrabajo ? sumarTiempos(total, paso.tiempoTrabajo) : total;
            }, '00:00');

            resultadosContenedor.append(`
                <h3>Costo de Mano de obra: $${tiempoAHoras(tiempoTrabajo) * (sueldoHora ? sueldoHora : 0)}</h3>
            `);
        }

        const formulario = new Formulario({
            campos: {
                sueldo: Input.Texto({ titulo: 'Sueldo Por Hora', placeholder: '$/hs' }),
            },
            alGuardar: (datos) => mostrarResultados(datos.sueldo)
        })

        const contenedorFormulario = $(`<div class="formulario-calculadora-costos"></div>`);
        contenedorFormulario.append(formulario.render());

        return new CampoContenedor('Calculadora de Costo Mano de Obra', [
            resultadosContenedor,
            contenedorFormulario
        ]).render();
    }
}