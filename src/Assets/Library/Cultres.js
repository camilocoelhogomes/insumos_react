const libraryCultures = [
    {
        label: 'Café Arábica',
        route: '/culture/arabic-coffee',
        config: { hasSoloAnalisys: true },
        calculators: [
            {
                label: 'Macro Nutrientes',
                route: '/culture/arabic-coffee/calculator/macro-nutrients',
                inputs: {
                    productivity: {
                        value: 35,
                        unit: 'sc/ha',
                        label: 'Produtividade Esperada'
                    },
                    distanceLines: {
                        value: 3,
                        unit: 'm',
                        label: 'Distância entre Linhas'
                    },
                    distancePlants: {
                        value: 1,
                        unit: 'm',
                        label: 'Distância entre Plantas'
                    },
                    temperature: {
                        value: 20,
                        unit: 'ºC',
                        label: 'Temperatura média anual'
                    },
                    phosphor: {
                        value: 8,
                        unit: 'P mg/dm³',
                        label: 'Fósforo'
                    },
                    potassium: {
                        value: 80,
                        unit: 'K mg/dm³',
                        label: 'Potássio'
                    },
                },
                formula: function () { return }
            },
            { label: 'Correção de Acidez' },
            { label: 'Micro Nutrientes' },
        ],
    },

];

export default libraryCultures;