import React, { useState } from "react";
import { Switch } from '@material-ui/core';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

import './App.css';


import Calculator from './components/Calculator'
import Output from "./components/Output";


function App() {
	const [navigation, setNavigation] = useState(library);
	const [formula, setFormula] = useState({
		formula: { N: 20, P: 5, K: 15 },
		qtdArea: [1790, 1844],
		qtdPlants: [537, 553]
	});

	const theme = createTheme({
		palette: {
			secondary: {
				main: '#FE9001'
			}
		}
	});



	const npkCalculation = () => {
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

		setFormula({
			formula: correctFormula[0],
			qtdArea: qtdArea,
			qtdPlants: qtdPlants
		});

		console.log(formula);
	}

	const hasSoloAnalisys = () => {
		const userNavigation = [...navigation]
		userNavigation[1].config.hasSoloAnalisys = !userNavigation[1].config.hasSoloAnalisys;
		if (!userNavigation[1].config.hasSoloAnalisys) {
			userNavigation[1].subItens[0].inputs['phosphor'].value = 8;
			userNavigation[1].subItens[0].inputs['potassium'].value = 80;
		}
		setNavigation(userNavigation);
		npkCalculation();
	}

	const changeInput = (value, name) => {
		const userNavigation = [...navigation];
		userNavigation[1].subItens[0].inputs[name].value = Number(value);
		setNavigation(userNavigation);
		npkCalculation();
	}

	const decInput = (name) => {
		const userNavigation = [...navigation];
		let step = 0;
		if (name === 'productivity') { step = 5 }
		if (name === 'distanceLines') { step = 0.5 }
		if (name === 'distancePlants') { step = 0.1 }
		if (name === 'temperature') { step = 1 }
		if (name === 'phosphor') { step = 1 }
		if (name === 'potassium') { step = 10 }
		userNavigation[1].subItens[0].inputs[name].value = Number((userNavigation[1].subItens[0].inputs[name].value - step).toFixed(1));
		setNavigation(userNavigation);
		npkCalculation();
	}

	const accInput = (name) => {
		const userNavigation = [...navigation];
		let step = 0;
		if (name === 'productivity') { step = 5 }
		if (name === 'distanceLines') { step = 0.5 }
		if (name === 'distancePlants') { step = 0.1 }
		if (name === 'temperature') { step = 1 }
		if (name === 'phosphor') { step = 1 }
		if (name === 'potassium') { step = 10 }

		userNavigation[1].subItens[0].inputs[name].value = Number((userNavigation[1].subItens[0].inputs[name].value + step).toFixed(1));
		setNavigation(userNavigation);
		npkCalculation();
	}

	return (
		<div className='root'>
			<MuiThemeProvider theme={theme}>
				<h1 className='title'>Simulador</h1>
				<div className='solo-analisys'>
					<p className='solo-analisys-label'>Possuo analise de solo</p>
					<Switch
						color="secondary"
						checked={navigation[1].config.hasSoloAnalisys}
						onChange={hasSoloAnalisys}
					/>
				</div>
				<ul className='calculator-navigation'>
					<li className='calculator-navigation-item'>Macro Nutrientes</li>
				</ul>
				<Calculator
					navigation={navigation}
					changeInput={changeInput}
					decInput={decInput}
					accInput={accInput}
				/>

				<Output
					formula={formula}
				/>
			</MuiThemeProvider>
		</div>
	);
}

export default App;

const library = [
	{
		label: 'Tela Inicial',
		icon: <ion-icon name="home-outline"></ion-icon>,
		subItens: null,
	},
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
];

const formulaLabrary = [
	{ N: 20, P: 5, K: 20 },
	{ N: 20, P: 5, K: 15 },
	{ N: 20, P: 5, K: 10 },
	{ N: 25, P: 0, K: 25 },
	{ N: 20, P: 0, K: 10 },
	{ N: 30, P: 0, K: 0 },
	{ N: 25, P: 5, K: 0 }
]
