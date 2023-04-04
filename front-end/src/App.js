import React from 'react';
import {
  BrowserRouter, Redirect, Route,
  Switch,
} from 'react-router-dom';
import AdminProvider from './Context/AdminProvider';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/customer/checkout" component={ Checkout } />
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
        <Route exact path="/register" component={ Register } />
        <AdminProvider>
          <Route exact path="/admin/manage" component={ Admin } />
        </AdminProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
