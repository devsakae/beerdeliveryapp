import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import cartContext from '../Context/CartContext';
import './Products.css';

export default function BuyButton() {
  const { total } = useContext(cartContext);
  const history = useHistory();

  return (
    <button
      type="button"
      className="buyBtn"
      data-testid="customer_products__button-cart"
      onClick={ () => history.push('/customer/checkout') }
      disabled={ total === 0 }
    >
      <p
        data-testid="customer_products__checkout-bottom-value"
      >
        { `Total: R$ ${new Intl.NumberFormat('pt-br', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
          .format(total)}` }
      </p>
    </button>
  );
}
