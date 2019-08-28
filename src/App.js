import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Info from './pages/Info';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

import CampoGrandePainel from './pages/campo-grande/Painel';
import CampoGrandeProduction from './pages/campo-grande/Production';
import CampoGrandeEnviromental from './pages/campo-grande/Enviromental';
import CampoGrandeLoss from './pages/campo-grande/Loss';

import IrecePainel from './pages/irece/Painel';
import IreceProduction from './pages/irece/Production';
import IreceEnviromental from './pages/irece/Enviromental';
import IreceLoss from './pages/irece/Loss';
import IreceLossTable from './pages/irece/LossPerTable';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sobre" component={About} />
        <Route path="/contato" component={Contact} />
        <Route path="/dados" component={Info} />
        <Route path="/login" component={Login} />
        <Route path="/cadastro" component={SignUp} />
        <Route path="/campo-grande/painel" component={CampoGrandePainel} />
        <Route path="/campo-grande/producao" component={CampoGrandeProduction} />
        <Route path="/campo-grande/ambientais" exact component={CampoGrandeEnviromental} />
        <Route path="/campo-grande/perdas" component={CampoGrandeLoss} />
        <Route path="/irece/painel" component={IrecePainel} />
        <Route path="/irece/producao" component={IreceProduction} />
        <Route path="/irece/ambientais" component={IreceEnviromental} />
        <Route path="/irece/perdas/mesas" exact component={IreceLoss} />
        <Route path="/irece/perdas/mesas/:table" exact component={IreceLossTable} />
        
        <Route path="/campo-grande" render={() => (
          <Redirect to={"/campo-grande/painel"} />
        )} />
        {/* <Route path="/irece" render={() => (
          <Redirect to={"/irece/painel"} />
        )} /> */}
        {/* <Route path="/irece/producao" render={() => (
          <Redirect to={"/irece/producao/" + date} />
        )} /> */}
        <Route path="/irece/perdas" render={() => (
          <Redirect to={"/irece/perdas/mesas"} />
        )} />
      
      </Switch>
    </BrowserRouter>
  );
}

export default App;
