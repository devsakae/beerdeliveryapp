import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuAdmin() {
  return (
    <Link
      to="/admin/manage"
      data-testid="customer_products__element-navbar-link-products"
    >
      GERENCIAR USUÁRIOS
    </Link>
  );
}
