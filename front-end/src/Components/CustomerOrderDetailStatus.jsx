import React from 'react';
import './StatusOrder.css';

export default function CustomerOrderDetailStatus({ order }) {
  const prefix = 'customer_order_details_';
  const testId = `${prefix}_element-order-details-label-delivery-status${order.id}`;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="orderdetail">
      <div
        data-testid={ `${prefix}_element-order-details-label-order-id` }
      >
        { `Pedido n. ${order.id}` }
      </div>
      <div
        data-testid={ `${prefix}_element-order-details-label-seller-name` }
      >
        { `Vendedor(a): ${order.seller}` }
      </div>
      <div
        data-testid={ `${prefix}_element-order-details-label-order-date` }
      >
        { `Data: ${formatDate(order.saleDate)}` }
      </div>
      <div
        data-testid={ testId }
      >
        { `Status: ${order.status}` }
      </div>
      <button
        type="button"
        data-testid={ `${prefix}_button-delivery-check` }
        disabled={ order.status !== 'Em trânsito' }
      >
        Marcar como entregue
      </button>
    </div>
  )
}
