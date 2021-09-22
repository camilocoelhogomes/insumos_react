const cultures = {
    coffee: [
        {
            label: 'Calculadoras',
            icon: <ion-icon name="calculator-outline"></ion-icon>,
            config: { hasSoloAnalisys: true },
            subItens: [
                {
                    label: 'Macro Nutrientes',
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
        {
            label: 'Cotações',
            icon: <div className='money-icon'>$</div>,
            subItens: null,
        },
        {
            label: 'Loja',
            icon: <ion-icon name="storefront-outline"></ion-icon>,
            subItens: null,
        }
    ]
};

export default cultures;