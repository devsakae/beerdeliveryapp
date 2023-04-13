import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './StatusOrder.css';

export default function StatusOrder({ order, changeStatus }) {
  const [btnPreparing, setBtnPreparing] = useState(true);
  const [btnDelivery, setBtnDelivery] = useState(true);

  const formatDate = (notFormattedDate) => {
    const date = new Date(notFormattedDate);
    return `${date.getDate()
      .toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  useEffect(() => {
    if (order.status === 'Pendente') setBtnPreparing(false);
    if (order.status === 'Preparando') setBtnDelivery(true);
  }, [order.status]);

  return (
    <div className="orderdetail">
      <div
        data-testid="seller_order_details__element-order-details-label-order-id"  
      >
        { `Pedido n. ${order.id}` }
      </div>
      <div
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        { `Comprado em ${formatDate(order.saleDate)}` }
      </div>
      <div
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        { `Status: ${order.status}` }
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
