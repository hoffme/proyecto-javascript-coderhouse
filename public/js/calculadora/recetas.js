class CalculadoraRecetas {
    constructor(receta) { this.receta = receta }

    pasos() {
        const pasosSimple = (receta) => {
            const pasos = [];

            receta.pasos.forEach(paso => {
                if (paso.ingredientes) {
                    paso.ingredientes.forEach(ingrediente => {
                        if (!ingrediente.ingrediente.pasos) return;
                        pasos.push(...pasosSimple(ingrediente.ingrediente));
                    });
                }
                pasos.push(paso);
            })

            return pasos;
        }
    
        return pasosSimple(this.receta);
    }

    ingredientes() {
        const ingredienteSimple = (receta) => {
            let ingredientes = {};

            receta.pasos.forEach(paso => {
                if (paso.ingredientes) {
                    paso.ingredientes.forEach(ingrediente => {
                        if (!ingrediente.ingrediente.pasos) {
                            if (!ingredientes[ingrediente.ingrediente.id]) {
                                ingredientes[ingrediente.ingrediente.id] = {
                                    ingrediente: ingrediente.ingrediente,
                                    cantidad: 0,
                                    unidad: ingrediente.unidad
                                }
                            }
    
                            ingredientes[ingrediente.ingrediente.id].cantidad += parseInt(ingrediente.cantidad);
                        } else {
                            ingredientes = {...ingredientes, ...ingredienteSimple(ingrediente.ingrediente)};
                        }
                    });
                }
            })

            return ingredientes;
        }
    
        return ingredienteSimple(this.receta);
    }

    subRecetas() {
        const subRecetas = (receta) => {
            const recetas = [];

            receta.pasos.forEach(paso => {
                if (paso.ingredientes) {
                    paso.ingredientes.forEach(ingrediente => {
                        if (!ingrediente.ingrediente.pasos) return;
                        recetas.push(
                            ...subRecetas(ingrediente.ingrediente),
                            ingrediente.ingrediente
                        );
                    });
                }
            })

            return recetas;
        }
    
        return subRecetas(this.receta);
    }

    costoMenor() {
        const costoMenor = (ingrediente) => {
            if (!ingrediente.ingrediente.pasos) {
                const preciosOrdenados = ingrediente.ingrediente.variaciones.sort((a, b) => {
                    return (a.precio / a.cantidad) - (b.precio / b.cantidad)
                });

                if (preciosOrdenados.length === 0) return 0;

                const varMin = preciosOrdenados[0];
                return varMin.precio * (ingrediente.cantidad / varMin.cantidad);
            }

            return ingrediente.ingrediente.pasos.reduce((costo, paso) => {
                if (paso.ingredientes) {
                    paso.ingredientes.forEach(ingrediente => {
                        return costo += costoMenor(ingrediente);
                    });
                }
                return costo;
            }, 0);
        }

        return costoMenor({ ingrediente: this.receta });
    }

    costoMayor() {
        const costoMayor = (ingrediente) => {
            if (!ingrediente.ingrediente.pasos) {
                const preciosOrdenados = ingrediente.ingrediente.variaciones.sort((a, b) => {
                    return (b.precio / b.cantidad) - (a.precio / a.cantidad)
                });

                if (preciosOrdenados.length === 0) return 0;

                const varMax = preciosOrdenados[0];
                return varMax.precio * (ingrediente.cantidad / varMax.cantidad);
            }

            return ingrediente.ingrediente.pasos.reduce((costo, paso) => {
                if (paso.ingredientes) {
                    paso.ingredientes.forEach(ingrediente => {
                        return costo += costoMayor(ingrediente);
                    });
                }
                return costo;
            }, 0);
        }

        return costoMayor({ ingrediente: this.receta });
    }

    costoMateriaPrima(variaciones) {
        const calcularCosto = (ingrediente) => {
            if (!ingrediente.ingrediente.pasos) {
                if (ingrediente.ingrediente.variaciones.length === 0) return 0;

                let indiceVariacion = variaciones[ingrediente.ingrediente.id];
                if (indiceVariacion === undefined) indiceVariacion = 0;

                const variacion = ingrediente.ingrediente.variaciones[indiceVariacion];

                return variacion.precio * (ingrediente.cantidad / variacion.cantidad);
            }

            return ingrediente.ingrediente.pasos.reduce((costo, paso) => {
                if (paso.ingredientes) {
                    paso.ingredientes.forEach(ingrediente => {
                        return costo += calcularCosto(ingrediente);
                    });
                }
                return costo;
            }, 0);
        }

        return calcularCosto({ ingrediente: this.receta });
    }

    consumoHerramientas() {
        const tiempoAHoras = (tiempo) => {
            const [minutos, segundos] = tiempo.split(':');
            return (parseInt(minutos) / 60) + (parseInt(segundos) / 3600);
        }

        const calcularCosto = (receta) => {
            return receta.pasos.reduce((costo, paso) => {
                if (paso.ingredientes) {
                    paso.ingredientes.forEach(ingrediente => {
                        if (!ingrediente.ingrediente.pasos) return; 

                        const costoExtra = calcularCosto(ingrediente.ingrediente);

                        costo.electricidad += costoExtra.electricidad;
                        costo.gas += costoExtra.gas;
                    });
                }

                if (paso.herramientas) {
                    paso.herramientas.forEach(herramienta => {
                        const consumo = parseInt(herramienta.herramienta.consumo);

                        if (herramienta.herramienta.unidad === 'watt/hs') {
                            costo.electricidad += consumo * tiempoAHoras(herramienta.tiempo);
                        } else if (herramienta.herramienta.unidad === 'cm3/hs') {
                            costo.gas += consumo * tiempoAHoras(herramienta.tiempo);
                        }
                    });
                }

                return costo;
            }, { electricidad: 0, gas: 0 });
        }

        return calcularCosto(this.receta);
    }
}