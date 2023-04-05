import React from 'react';
import {
  BrowserRouter, Redirect, Route,
  Switch,
} from 'react-router-dom';

import AdminProvider from './Context/AdminProvider';
import CartProvider from './Context/CartProvider';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import SellersOdersD from './pages/SellerOrderDetails';
import SellerDetailsProvider from './Context/SellerDetailsProvider';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
        <CartProvider>
          <Route exact path="/customer/checkout" component={ Checkout } />
          <Route exact path="/customer/products" component={ Products } />
        </CartProvider>
        <Route exact path="/register" component={ Register } />
        <AdminProvider>
          <Route exact path="/admin/manage" component={ Admin } />
        </AdminProvider>
        <Route exact path="/admin/manage" component={ Admin } />
        <SellerDetailsProvider>
          <Route exact path="/seller/orders" component={ SellersOdersD } />
        </SellerDetailsProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
