import { useHistory } from 'react-router-dom';
import React from 'react';

function Header() {
  const history = useHistory();

  const products = (e) => {
    e.preventDefault();
    history.push('/customer/products');
  };

  return (
    <nav>
      <button
        type="button"
        onClick={ products }
        data-testid="customer_products__element-navbar-link-products"
      >
        PRODUTOS
      </button>
    </nav>
  );
}

export default Header;
