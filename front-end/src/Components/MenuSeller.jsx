import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuSeller() {
  return (
    <Link
      to="/seller/orders"
      data-testid="customer_products__element-navbar-link-orders"
    >
      PEDIDOS
    </Link>
  );
}
