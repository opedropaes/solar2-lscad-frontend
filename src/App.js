import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import isAuthenticated from './services/auth';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Info from './pages/Info';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CriateSupervisor from './pages/CreateSupervisor';

import Panel from './pages/Painel';
import CampoGrandeProduction from './pages/campo-grande/Production';
import CampoGrandeEnviromental from './pages/campo-grande/Enviromental';
import CampoGrandeLoss from './pages/campo-grande/Loss';

import IreceProduction from './pages/irece/Productions';
import IreceProductionTable from './pages/irece/ProductionPerTable';
import IreceEnviromental from './pages/irece/Enviromental';
import IreceLoss from './pages/irece/Loss';
import IreceLossTable from './pages/irece/LossPerTable';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route 
		{ ...rest }
		render={props => 
			isAuthenticated() ? (
				<Component { ...props } />
			) : (
				<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
			)
		}
	/>
);

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sobre" component={About} />
        <Route path="/contato" component={Contact} />
        <Route path="/dados" component={Info} />
        <Route path="/login" exact component={Login} />
        <Route path="/cadastro" component={SignUp} />
		<PrivateRoute path="/criar-supervisor" component={CriateSupervisor} />
        <PrivateRoute path="/painel" exact component={Panel} />
        <PrivateRoute path="/campo-grande/producao" component={CampoGrandeProduction} />
        <PrivateRoute path="/campo-grande/ambientais" exact component={CampoGrandeEnviromental} />
        <PrivateRoute path="/campo-grande/perdas" component={CampoGrandeLoss} />
        <PrivateRoute path="/irece/producao" exact component={IreceProduction} />
		<PrivateRoute path="/irece/producao/mesas/:table" exact component={IreceProductionTable} />
        <PrivateRoute path="/irece/ambientais" component={IreceEnviromental} />
        <PrivateRoute path="/irece/perdas/mesas" exact component={IreceLoss} />
        <PrivateRoute path="/irece/perdas/mesas/:table" exact component={IreceLossTable} />
        
        <PrivateRoute path="/campo-grande" render={() => (
          <Redirect to={"/campo-grande/painel"} />
        )} />
        {/* <Route path="/irece" render={() => (
          <Redirect to={"/irece/painel"} />
        )} /> */}
        {/* <Route path="/irece/producao" render={() => (
          <Redirect to={"/irece/producao/" + date} />
        )} /> */}
        <PrivateRoute path="/irece/perdas" render={() => (
          <Redirect to={"/irece/perdas/mesas"} />
        )} />
      
      </Switch>
    </BrowserRouter>
  );
}

export default App;
