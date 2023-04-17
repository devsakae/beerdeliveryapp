import React from 'react';
import { IconContext } from 'react-icons';
import { HiUsers } from 'react-icons/hi';
import { RiInkBottleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import './Header.css';

export default function MenuAdmin() {
  return (
    <IconContext.Provider value={ { color: 'black', size: '80px' } }>
      <Link
        to="/admin/products"
        className="menuicons bgcoral"
      >
        <RiInkBottleFill />
      </Link>
      <Link
        to="/admin/manage"
        data-testid="customer_products__element-navbar-link-products"
        className="menuicons bgyellow"
      >
        <HiUsers />
      </Link>
    </IconContext.Provider>
  );
}
