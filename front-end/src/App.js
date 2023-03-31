import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import CustomerProducts from './pages/CustomerProducts';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/customer/products" component={ CustomerProducts } />
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
        <Route exact path="/register" component={ Register } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
