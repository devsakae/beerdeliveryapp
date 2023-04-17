import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import {
  getFromLocalStorage,
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
          { (userIsCustomer || userIsSeller) && <MenuCustomer role={ role } /> }
          <div className="headerClient">
            <h3
              data-testid="customer_products__element-navbar-user-full-name"
            >
              { name }
            </h3>
            <Link
              to="/"
              data-testid="customer_products__element-navbar-link-logout"
              onClick={ () => localStorage.clear() }
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
