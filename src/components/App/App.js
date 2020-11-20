import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';


import BookingForm from '../BookingForm/BookingForm';
import Home from '../Home/Home';
import SlotDetails from '../SlotDetails/SlotDetails';
import './App.css';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#33c9dc',
			main: '#FF5722',
			dark: '#d50000',
			contrastText: '#fff'
		}
	}
});

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<Router>
				<div className="app flex">
					<div className="app__title flex">
						<h1>M<br />O<br />V<br />I<br />E<br />S<br />N<br />O<br />W</h1>
					</div>
					<div className="app__details">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/slot/details" component={SlotDetails} />
						<Route path="/slot/book" component={BookingForm} />
					</Switch>
					</div>
				</div>
			</Router>
		</MuiThemeProvider>
	);
}

export default App;