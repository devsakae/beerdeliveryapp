import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import {
  getFromLocalStorage,
  removeKeyFromLocalStorage,
} from '../services/localStorage';
import './Header.css';
import MenuAdmin from './MenuAdmin';
import MenuCustomer from './MenuCustomer';

export default function Header() {
  const { name, role } = getFromLocalStorage('user');
  const userIsAdmin = role === 'administrator';
  const userIsSeller = role === 'seller';
  const userIsCustomer = role === 'customer';
  return (
    <header>
      <nav>
        <div className="halfheader">
          <img src={ logo } />
        </div>
        <div className="halfheader">
        { userIsAdmin && <MenuAdmin /> }
        {/* { userIsSeller && <MenuSeller /> } */}
        { (userIsCustomer || userIsSeller) && <MenuCustomer role={ role } /> }
        <div className='headerClient'>
          <p data-testid="customer_products__element-navbar-user-full-name">
          { name }
          </p>
          <Link
            to="/"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => removeKeyFromLocalStorage('user') }
            >
            Logout
          </Link>
        </div>
        </div>
      </nav>
    </header>
  );
}
