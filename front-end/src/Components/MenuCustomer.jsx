import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuCustomer() {
  return (
    <>
      <Link
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        PRODUTOS
      </Link>
      <Link
        to="/customer/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        MEUS PEDIDOS
      </Link>
    </>
  );
}
