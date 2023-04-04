import React from 'react';
import { func, arrayOf, number, shape } from 'prop-types';

export default function TableOrder({
  orderItens,
  total,
  deleteItem,
}) {
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
          {orderItens.map((item, i) => (
            <tr key={ i }>
              <td
                data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
              >
                {i + 1}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${i}` }
              >
                {item.descricao}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
              >
                {item.quantidade}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
              >
                {item.valorUnitario}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
              >
                {item.quantidade * item.valorUnitario}
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
      <p>{`Total: R$${total}`}</p>
    </div>
  );
}

TableOrder.propTypes = {
  orderItens: arrayOf(shape),
  total: number,
  deleteItem: func,
}.isRequired;
