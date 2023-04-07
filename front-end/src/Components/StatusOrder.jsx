import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function StatusOrder({ order, changeStatus }) {
  const [btnPreparing, setBtnPreparing] = useState(true);
  const [btnDelivery, setBtnDelivery] = useState(true);

  useEffect(() => {
    if (order.status === 'Pendente') setBtnPreparing(false);
    if (order.status === 'Preparando') setBtnDelivery(true);
  }, [order.status]);

  return (
    <div style={ { display: 'flex', gap: '15px' } }>
      <div
        data-testid="seller_order_details__element-order-details-label-order-id"
      >
        { order.id }

      </div>
      <div
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        { order.saleDate }

      </div>
      <div
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        { order.status }

      </div>
      <button
        type="button"
        disabled={ btnPreparing }
        onClick={ () => changeStatus() }
        data-testid="seller_order_details__button-preparing-check"
      >
        PREPARAR PEDIDO

      </button>
      <button
        type="button"
        disabled={ btnDelivery }
        onClick={ () => changeStatus() }
        data-testid="seller_order_details__button-dispatch-check"
      >
        SAIU PARA ENTREGA

      </button>
    </div>
  );
}

StatusOrder.propTypes = {
  id: PropTypes.number,
  saleDate: PropTypes.string,
  status: PropTypes.string,
}.isRequired;
