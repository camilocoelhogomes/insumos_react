import React, { useState } from "react";
import { MuiThemeProvider } from '@material-ui/core/styles';
import npkCalculation from "./formula/npkCalculation";
import theme from './Assets/Style/theme';
import styled from 'styled-components';
import cultures from "./Assets/Library/Cultres";

import Calculator from './components/Calculator'
import Output from "./components/Output";


function App() {
	const [navigation, setNavigation] = useState(cultures.coffee);
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
		<MuiThemeProvider theme={theme}>
			<Main>
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
	);
}

export default App;

const Main = styled.main`
	padding: 48px 20px;
`



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
