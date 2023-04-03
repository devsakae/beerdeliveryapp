import React from 'react';
import { Link } from 'react-router-dom';
import { removeKeyFromLocalStorage } from '../services/localStorage';

export default function Header() {
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
        Fulano Bezerra
      </div>
      <Link
        to="/"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => removeKeyFromLocalStorage('fazo4_user') }
      >
        Sair
      </Link>
    </nav>
  );
}
