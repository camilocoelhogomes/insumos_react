import React, { useState } from "react";
import { Switch, Typography } from '@material-ui/core';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import npkCalculation from "./formula/npkCalculation";
import theme from './theme';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components';


import Calculator from './components/Calculator'
import Output from "./components/Output";


function App() {
	const [navigation, setNavigation] = useState(library);
	const [formula, setFormula] = useState({
		formula: { N: 20, P: 5, K: 15 },
		qtdArea: [1790, 1844],
		qtdPlants: [537, 553]
	});

	const hasSoloAnalisys = () => {
		const userNavigation = [...navigation]
		userNavigation[1].config.hasSoloAnalisys = !userNavigation[1].config.hasSoloAnalisys;
		if (!userNavigation[1].config.hasSoloAnalisys) {
			userNavigation[1].subItens[0].inputs['phosphor'].value = 8;
			userNavigation[1].subItens[0].inputs['potassium'].value = 80;
		}
		setNavigation(userNavigation);
		setFormula(npkCalculation({ navigation, formulaLabrary }));
	}

	const changeInput = (value, name) => {
		const userNavigation = [...navigation];
		userNavigation[1].subItens[0].inputs[name].value = Number(value);
		setNavigation(userNavigation);
		setFormula(npkCalculation({ navigation, formulaLabrary }));
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
		if (userNavigation[1].subItens[0].inputs[name].value <= step) { return }
		userNavigation[1].subItens[0].inputs[name].value = Number((userNavigation[1].subItens[0].inputs[name].value - step).toFixed(1));
		setNavigation(userNavigation);
		setFormula(npkCalculation({ navigation, formulaLabrary }));
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
		setFormula(npkCalculation({ navigation, formulaLabrary }));
	}

	return (

		<div className='root'>
			<MuiThemeProvider theme={theme}>
				<AppBar position="fixed" color='inherit'>
					<Toolbar variant="dense">
						<IconButton edge="start" color="secondary" aria-label="menu">
							<MenuIcon color="secondary" />
						</IconButton>
						<Typography variant="h2" color="primary">
							Simulador
						</Typography>
					</Toolbar>
				</AppBar>
				<Main>
					<div className='solo-analisys'>
						<p className='solo-analisys-label'>Possuo analise de solo</p>
						<Switch
							color="primary"
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
				</Main>
			</MuiThemeProvider>
		</div>
	);
}

export default App;

const Main = styled.main`
	padding: 48px 20px;
`

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
	{ N: 20, P: 5, K: 20, technology: 'convencional' },
	{ N: 20, P: 5, K: 15, technology: 'convencional' },
	{ N: 20, P: 5, K: 10, technology: 'convencional' },
	{ N: 25, P: 0, K: 25, technology: 'convencional' },
	{ N: 20, P: 0, K: 10, technology: 'convencional' },
	{ N: 30, P: 0, K: 0, technology: 'convencional' },
	{ N: 25, P: 5, K: 0, technology: 'convencional' },
	{ N: 20, P: 0, K: 15, technology: 'convencional' }
]
