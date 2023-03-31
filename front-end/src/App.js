import React from 'react';
import {
  BrowserRouter, Redirect, Route,
  Switch,
} from 'react-router-dom';

import Register from './Components/RegisterBox';
import Vazio from './Components/Vazio';
import Login from './pages/Login';
import CustomerProducts from './pages/CustomerProducts';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/customer/products" component={ CustomerProducts } />
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
