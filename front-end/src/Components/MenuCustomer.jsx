import React from 'react';
import { IconContext } from 'react-icons';
import { HiHome } from 'react-icons/hi';
import { MdDeliveryDining } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './Header.css';

export default function MenuCustomer({ role }) {
  return (
    <IconContext.Provider value={ { color: 'black', size: '80px' } }>
      { (role !== 'seller') && <Link
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
        className="menuicons bgyellow"
      >
        <HiHome />
      </Link> }
      <Link
        to={ `/${role}/orders` }
        data-testid="customer_products__element-navbar-link-orders"
        className="menuicons bgcoral"
      >
        <MdDeliveryDining />
      </Link>
    </IconContext.Provider>
  );
}
