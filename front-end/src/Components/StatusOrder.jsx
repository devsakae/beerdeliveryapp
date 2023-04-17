import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './StatusOrder.css';

export default function StatusOrder({ order, changeStatus }) {
  const [tempStatus, setTempStatus] = useState('');
  const [btnPreparing, setBtnPreparing] = useState(true);
  const [btnDelivery, setBtnDelivery] = useState(true);

  const formatDate = (notFormattedDate) => {
    const date = new Date(notFormattedDate);
    return `${date.getDate().toString().padStart(2, '0')}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
  };

  const handleStatus = () => {
    if (order.status === 'Pendente') {
      setTempStatus('Preparando');
      setBtnPreparing(true);
    }
    if (order.status === 'Preparando') {
      setTempStatus('Em trânsito');
      setBtnDelivery(true);
    }
    changeStatus();
  };

  useEffect(() => {
    setTempStatus(order.status);
  }, [order]);

  useEffect(() => {
    if (tempStatus === 'Pendente') setBtnPreparing(false);
    if (tempStatus === 'Preparando') setBtnDelivery(false);
  }, [tempStatus]);

  return (
    <section>
      <h2 data-testid="seller_order_details__element-order-details-label-order-id">
        {`Pedido n. ${order.id}`}
      </h2>
      <div className="orderdetail">
        <div data-testid="seller_order_details__element-order-details-label-order-date">
          {`Comprado em ${formatDate(order.saleDate)}`}
        </div>
        <div data-testid="seller_order_details__element-order-details-label-delivery-status">
          {`Status: ${tempStatus}`}
        </div>
        <button
          type="button"
          disabled={ btnPreparing }
          onClick={ handleStatus }
          data-testid="seller_order_details__button-preparing-check"
        >
          PREPARAR PEDIDO
        </button>
        <button
          type="button"
          disabled={ btnDelivery }
          onClick={ handleStatus }
          data-testid="seller_order_details__button-dispatch-check"
        >
          SAIU PARA ENTREGA
        </button>
      </div>
    </section>
  );
}

StatusOrder.propTypes = {
  id: PropTypes.number,
  saleDate: PropTypes.string,
  status: PropTypes.string,
}.isRequired;
