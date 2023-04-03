import React from 'react';
import { Link } from 'react-router-dom';
import { getFromLocalStorage, removeKeyFromLocalStorage } from '../services/localStorage';

export default function Header() {
  const { name } = getFromLocalStorage('user');
  return (
    <nav>
      <Link
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        Produtos
      </Link>
      <Link
        to="/customer/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Meus Pedidos
      </Link>
      <div data-testid="customer_products__element-navbar-user-full-name">
        { name }
      </div>
      <Link
        to="/"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => removeKeyFromLocalStorage('user') }
      >
        Sair
      </Link>
    </nav>
  );
}
