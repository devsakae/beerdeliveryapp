import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuSeller() {
  return (
    <Link
      to="/ARRUMARLINK"
      data-testid="customer_products__element-navbar-link-products"
    >
      PEDIDOS
    </Link>
  );
}
