import React from 'react';
import {
  BrowserRouter, Redirect, Route,
  Switch,
} from 'react-router-dom';

import AuthForm from './Components/AuthForm';
import CartProvider from './Context/CartProvider';
import AdminProducts from './pages/AdminProducts';
import AdminUsers from './pages/AdminUsers';
import Checkout from './pages/Checkout';
import CustomerOrderDetail from './pages/CustomerOrderDetail';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Register from './pages/Register';
import SellerOrdersDetails from './pages/SellerOrderDetails';
import SellerOrders from './pages/SellerOrders';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/googlelogin" component={ AuthForm } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/admin/manage" component={ AdminUsers } />
        <Route exact path="/admin/products" component={ AdminProducts } />
        <CartProvider>
          <Route exact path="/seller/orders" component={ SellerOrders } />
          <Route exact path="/seller/orders/:id" component={ SellerOrdersDetails } />
          <Route exact path="/customer/checkout" component={ Checkout } />
          <Route exact path="/customer/products" component={ Products } />
          <Route exact path="/customer/orders" component={ Orders } />
          <Route exact path="/customer/orders/:id" component={ CustomerOrderDetail } />
        </CartProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
