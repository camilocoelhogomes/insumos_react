const npkCalculation = ({ navigation, formulaLabrary }) => {
    const inputs = { ...navigation[1].subItens[0].inputs };
    let npkNeeded = {
        nitrogen: [6.2, 6.2],
        phosphor: [0.6, 0.6],
        potassium: [5.9, 5.9],
    };

    const npkSaca = {
        nitrogen: [6.2, 6.2],
        phosphor: [0.6, 0.6],
        potassium: [5.9, 5.9],
    }

    const tecnologieAdjuste = (tecnologie, npkNeeded) => {
        if (tecnologie === 'convencional') {
            npkNeeded.nitrogen = [npkNeeded.nitrogen[0] * 1.5, npkNeeded.nitrogen[1] * 1.7];
            npkNeeded.phosphor = [npkNeeded.phosphor[0] * 1.3, npkNeeded.phosphor[1] * 1.5];
            npkNeeded.potassium = [npkNeeded.potassium[0] * 1.3, npkNeeded.potassium[1] * 1.5];
        }
        return npkNeeded;
    }

    function plantsDensityAdjuste(npkNeeded) {

        let plantDensity = 10000 / (inputs.distanceLines.value * inputs.distancePlants.value);

        if (plantDensity > 6000) {
            Object.keys(npkNeeded).forEach(item => npkNeeded[item] = [npkNeeded[item][0] -= 0.25 * npkSaca[item][0], npkNeeded[item][1] -= 0.2 * npkSaca[item][1]])
        }

        return npkNeeded;

    }

    function temperatureAdjuste(npkNeeded) {

        if (inputs.temperature.value < 19) {
            npkNeeded.nitrogen = [npkNeeded.nitrogen[0] -= 0.15 * npkSaca.nitrogen[0], npkNeeded.nitrogen[1] -= 0.1 * npkSaca.nitrogen[1]]
        }

        else if (inputs.temperature.value > 22) {
            npkNeeded.nitrogen = [npkNeeded.nitrogen[0] += 0.15 * npkSaca.nitrogen[0], npkNeeded.nitrogen[1] += 0.2 * npkSaca.nitrogen[1]]
        }

        return npkNeeded;

    }

    const phosphorAdjuste = (npkNeeded) => {

        if (inputs.phosphor.value < 10) {
            npkNeeded.phosphor = [npkNeeded.phosphor[0], npkNeeded.phosphor[1]]
        }

        else if (inputs.phosphor.value < 20) {
            npkNeeded.phosphor = [npkNeeded.phosphor[0] -= 0.5 * npkSaca.phosphor[0], npkNeeded.phosphor[1] -= 0.5 * npkSaca.phosphor[1]]
        }

        else {
            npkNeeded.phosphor = [0, 0];
        }

        return npkNeeded;
    }


    const potassiumAdjuste = (npkNeeded) => {
        if (inputs.potassium.value < 60) {
            npkNeeded.potassium = [npkNeeded.potassium[0] += 0.2 * npkSaca.potassium[0], npkNeeded.potassium[1] += 0.3 * npkSaca.potassium[1]]
        }

        else if (inputs.potassium.value < 110) {
            npkNeeded.potassium = [npkNeeded.potassium[0], npkNeeded.potassium[1]]
        }

        else if (inputs.potassium.value < 160) {
            npkNeeded.potassium = [npkNeeded.potassium[0] -= (1 / 3) * npkSaca.potassium[0], npkNeeded.potassium[1] -= (1 / 3) * npkSaca.potassium[1]]
        }

        else {
            npkNeeded.potassium = [0, 0];
        }

        return npkNeeded;

    }

    const productivityAdjuste = (npkNeeded) => {
        Object.keys(npkNeeded).forEach(item => npkNeeded[item] = [npkNeeded[item][0] * inputs.productivity.value, npkNeeded[item][1] * inputs.productivity.value]);
        return npkNeeded;
    }

    npkNeeded = temperatureAdjuste(npkNeeded);
    npkNeeded = plantsDensityAdjuste(npkNeeded)
    npkNeeded = phosphorAdjuste(npkNeeded);
    npkNeeded = potassiumAdjuste(npkNeeded);
    npkNeeded = productivityAdjuste(npkNeeded);
    npkNeeded = tecnologieAdjuste('convencional', npkNeeded);

    const npkRelation = {
        phosphor: [npkNeeded.phosphor[0] / npkNeeded.nitrogen[1], npkNeeded.phosphor[1] / npkNeeded.nitrogen[0]],
        potassium: [npkNeeded.potassium[0] / npkNeeded.nitrogen[1], npkNeeded.potassium[1] / npkNeeded.nitrogen[0]]
    }

    const filterPhosphor = (formula) => {
        if (npkRelation.phosphor[1] > 0) {
            return formula.P > 0;
        } return formula.P === 0;

    }

    const filterPotassium = (formula) => {
        const potassiumRelation = formula.K / formula.N;
        return (potassiumRelation >= npkRelation.potassium[0] && potassiumRelation <= npkRelation.potassium[1])
    }

    const totalNutrients = () => {
        let qtdArea = [];
        if (correctFormula[0].K > 0) {
            qtdArea = [
                Math.max((100 * npkNeeded.nitrogen[0] / correctFormula[0].N), (100 * npkNeeded.potassium[0] / correctFormula[0].K)),
                Math.min((100 * npkNeeded.nitrogen[1] / correctFormula[0].N), (100 * npkNeeded.potassium[1] / correctFormula[0].K))
            ];
        }
        if (correctFormula[0].K === 0) {
            qtdArea = [100 * npkNeeded.nitrogen[0] / correctFormula[0].N, 100 * npkNeeded.nitrogen[1] / correctFormula[0].N];
        }
        return (qtdArea);
    }

    const correctFormula = formulaLabrary.filter(formula => filterPhosphor(formula)).filter(formula => filterPotassium(formula));


    const qtdArea = totalNutrients()

    const qtdPlants = [qtdArea[0] / (10 / (inputs.distanceLines.value * inputs.distancePlants.value)), qtdArea[1] / (10 / (inputs.distanceLines.value * inputs.distancePlants.value))]

    return {
        formula: correctFormula[0],
        qtdArea: qtdArea,
        qtdPlants: qtdPlants
    };

}

export default npkCalculation;