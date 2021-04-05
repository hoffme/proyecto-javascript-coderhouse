class CalculadoraRecetas {
    constructor(receta) {
        this.receta = receta;
    }

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
                const preciosOrdenados = ingrediente.ingrediente.variaciones.sort((a, b) => a.precio - b.precio);

                if (preciosOrdenados.length === 0) return 0;

                const varMin = preciosOrdenados[0];
                return varMin.precio * (ingrediente.cantidad / varMin.cantidad);
            }

            ingrediente.ingrediente.pasos.reduce((costo, paso) => {
                return costo + costoMenor(paso.ingrediente);
            }, 0);
        }

        return costoMenor({ ingrediente: this.receta });
    }

    costoMayor() {
        const costoMayor = (ingrediente) => {
            if (!ingrediente.ingrediente.pasos) {
                const preciosOrdenados = ingrediente.ingrediente.variaciones.sort((a, b) => b.precio - a.precio);

                if (preciosOrdenados.length === 0) return 0;

                const varMax = preciosOrdenados[0];
                return varMax.precio * (ingrediente.cantidad / varMax.cantidad);
            }

            ingrediente.ingrediente.pasos.reduce((costo, paso) => {
                return costo + costoMayor(paso.ingrediente);
            }, 0);
        }

        return costoMayor({ ingrediente: this.receta });
    }
}