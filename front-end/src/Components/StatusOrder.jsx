import React from 'react';

export default function StatusOrder(props) {
  return (
    <div style={{ display: "flex", gap: "15px" }}>
      <div
        data-testid="seller_order_details__element-order-details-label-order-id"
      >{ props.order.id }</div>
      <div
        data-testid="seller_order_details__element-order-details-label-order-date"
      >{ props.order.saleDate }</div>
      <div
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >{ props.order.status }</div>
      <button>Botão 1</button>
      <button>Botão 2</button>
    </div>
  )
}
