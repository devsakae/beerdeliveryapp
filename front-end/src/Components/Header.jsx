import React from 'react';
import { Link } from 'react-router-dom';
import {
  getFromLocalStorage,
  removeKeyFromLocalStorage,
} from '../services/localStorage';
import './Header.css';
import MenuAdmin from './MenuAdmin';
import MenuCustomer from './MenuCustomer';
import MenuSeller from './MenuSeller';

export default function Header() {
  const { name, role } = getFromLocalStorage('user');
  const userIsAdmin = role === 'administrator';
  const userIsSeller = role === 'seller';
  const userIsCustomer = role === 'customer';
  return (
    <header>
      <nav>
        <div className='sidemenu'>
          { userIsAdmin && <MenuAdmin /> }
          { userIsSeller && <MenuSeller /> }
          { userIsCustomer && <MenuCustomer /> }
        </div>
        <div className='sidemenu'>
          <div
            data-testid="customer_products__element-navbar-user-full-name"
          >
            {name}
          </div>
          <div>
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
