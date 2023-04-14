import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './StatusOrder.css';
const api = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

export default function CustomerOrderDetailStatus({ order }) {
  const [tempStatus, setTempStatus] = useState(order.status);
  const { id } = useParams();

  const handleStatus = (event) => {
    event.preventDefault();
    axios.put(`${api}/sales/${id}`, { status: 'Entregue' }, { mode: 'no-cors' })
    .then((_r) => setTempStatus('Entregue'))
    .catch((err) => console.log(err));
  };

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
        { `Status: ${tempStatus}` }
      </div>
      <button
        type="button"
        data-testid={ `${prefix}_button-delivery-check` }
        onClick={ handleStatus }
        disabled={ tempStatus !== 'Em Trânsito' }
      >
        Marcar como entregue
      </button>
    </div>
  )
}
