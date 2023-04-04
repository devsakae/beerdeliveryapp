import React, { useContext } from 'react';
import cartContext from '../Context/CartContext';

export default function TableOrder() {
  const {
    cart,
    total,
    deleteItem,
  } = useContext(cartContext);
  return (
    <div>
      <p>Finalizar Pedido</p>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-Total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {cart.filter((p) => p.quantity > 0).map((prod, i) => (
            <tr key={ i }>
              <td
                data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
              >
                {i + 1}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${i}` }
              >
                {prod.item.name}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
              >
                {prod.quantity}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
              >
                {prod.item.price}
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
                  onClick={ () => deleteItem(i) }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p
        data-testid="customer_checkout__element-order-total-price"
      >
        {`Total: R$${total}`}
      </p>
    </div>
  );
}

TableOrder.propTypes = {
  orderItens: arrayOf(shape),
  total: number,
  deleteItem: func,
}.isRequired;
