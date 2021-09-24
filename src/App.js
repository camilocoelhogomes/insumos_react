import React, { useState } from "react";
import CulruresContext from "./Store/cultureContext";
import {
	BrowserRouter,
	Switch,
	Route,
} from "react-router-dom";

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './Assets/Style/theme';
import styled from 'styled-components';
import libraryCultures from "./Assets/Library/Cultres";
import Calculator from './components/Calculator';
import NavigationPage from "./Pages/Navigation";

function App() {

	const [cultures, setCultures] = useState(libraryCultures)

	return (
		<MuiThemeProvider theme={theme}>
			<CulruresContext.Povider value={cultures, setCultures}>
				<Main>
					<BrowserRouter>
						<Switch>
							<Route path='/' exact>
								<NavigationPage />
							</Route>
						</Switch>
						{
							/*
		
							<Calculator
								navigation={navigation}
								changeInput={changeInput}
								decInput={decInput}
								accInput={accInput}
							/>
		
							*/
						}
					</BrowserRouter>
				</Main>
			</CulruresContext.Povider>
		</MuiThemeProvider>
	);
}

export default App;

const Main = styled.main`
	padding: 48px 20px;
`
