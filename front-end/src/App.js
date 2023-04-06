import React from 'react';
import {
  BrowserRouter, Redirect, Route,
  Switch,
} from 'react-router-dom';

import CartProvider from './Context/CartProvider';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import SellersOdersDetails from './Components/SellerOrdersDetails';
import SellerOrders from './pages/SellerOrders';
import CustomerOrderDetail from './pages/CustomerOrderDetail';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/admin/manage" component={ Admin } />
        <Route exact path="/seller/orders" component={ SellerOrders } />
        <Route exact path="/seller/orders/:id" component={ SellersOdersDetails } />
        <CartProvider>
          <Route exact path="/customer/checkout" component={ Checkout } />
          <Route exact path="/customer/products" component={ Products } />
          <Route exact path="/customer/orders/:id" component={ CustomerOrderDetail } />
        </CartProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
