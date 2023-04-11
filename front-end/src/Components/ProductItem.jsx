import React, { useContext } from 'react';
import cartContext from '../Context/CartContext';

export default function ProductItem({ prod, i }) {
  const { deleteItem } = useContext(cartContext);

  return (
    <tr>
      <td
        data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
      >
        {i + 1}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-name-${i}` }
      >
        { prod.item.name }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
      >
        { prod.quantity }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
      >
        {new Intl.NumberFormat('pt-br', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
          .format(prod.item.price)}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
      >
        { new Intl.NumberFormat('pt-br', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
          .format(prod.item.price * prod.quantity) }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-remove-${i}` }
      >
        <button
          type="button"
          onClick={ () => deleteItem(prod.item.id) }
        >
          Remover
        </button>
      </td>
    </tr>
  )
}
