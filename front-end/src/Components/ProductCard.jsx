import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import cartContext from '../Context/CartContext';
import './Products.css';

export default function ProductCard({ prod }) {
  const {
    increaseQuantity,
    decreaseQuantity,
    handleQuantityChange,
  } = useContext(cartContext);

  return (
    <div className="productCard">
      <img
        src={ prod.item.urlImage }
        alt={ `Imagem do produto ${prod.item.name}` }
        data-testid={ `customer_products__img-card-bg-image-${prod.item.id}` }
        width="90"
        height="100"
      />
      <div>
        <p
          data-testid={ `customer_products__element-card-title-${prod.item.id}` }
        >
          { prod.item.name }
        </p>
        <p
        className='price'
          data-testid={ `customer_products__element-card-price-${prod.item.id}` }
        >
            { `R$ ${prod.item.price.split('.').join(',')}` }
        </p>
        <button
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${prod.item.id}` }
          onClick={ () => decreaseQuantity(prod) }
          className="qtyBtn"
        >
          -
        </button>
        <input
          type="text"
          value={ prod.quantity }
          data-testid={ `customer_products__input-card-quantity-${prod.item.id}` }
          onChange={ (evt) => handleQuantityChange(evt, prod) }
          className="qtyInput"
        />
        <button
          type="button"
          data-testid={
            `customer_products__button-card-add-item-${prod.item.id}`
          }
          className="qtyBtn"
          onClick={ () => increaseQuantity(prod) }
        >
          +
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  prod: PropTypes.object,
  item: PropTypes.object,
}.isRequired;
