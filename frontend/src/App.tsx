import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar'

import './style.css';

import Home from './pages/Home'
import Create from './pages/Create'

import {
  HOME, CREATE
} from './constants/routes'

const App = () => {
  return (
		<BrowserRouter>
			<div style={{ display: 'flex' }}>
				<Navbar />
				<Switch>
    	  			<Route component={Home} exact path={HOME} />
					<Route component={Create} exact path={CREATE} />
      			</Switch>
      		</div>
		</BrowserRouter>
	)
}

export default App;
