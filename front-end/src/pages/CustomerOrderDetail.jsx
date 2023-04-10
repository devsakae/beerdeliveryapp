import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerOrderDetailRow from '../Components/CustomerOrderDetailRow';
import Header from '../Components/Header';

const { useParams } = require('react-router-dom');

const PATH = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

// const orderItemsMock = [ // mock
//   {
//     // Seller
//     seller: 'Vendedor 1',

//     // Sale
//     id: 1,
//     saleDate: '12/12/24',
//     status: 'Entregue',
//     total: 20,

//     // sale_product -> Product
//     name: 'Item 1',
//     price: 10,
//     quantity: 2,
//     subtotal: 20,
//   },
// ];

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  return `${day}/${month}/${year}`;
}

function CustomerOrderDetail() {
  const { id } = useParams();
  const [orderItems, setOrderItems] = useState([]);

  const prefix = 'customer_order_details_';
  const testId = `${prefix}_element-order-details-label-delivery-status${id}`;

  useEffect(() => {
    const fetchOrder = async () => {
      const order = await axios.get(`${PATH}/sale_product/${id}`);
      console.log(order);
      if (order.data.length !== 0) {
        setOrderItems(order.data);
      }
    };
    fetchOrder();
  }, [id]);

  if (orderItems.length === 0) return (<div>Carregando...</div>);

  return (
    <div>
      <Header />
      <table>
        <tbody>
          <tr>
            <td
              data-testid={ `${prefix}_element-order-details-label-order-id` }
            >
              { orderItems[0].id || '0' }
            </td>
            <td
              data-testid={ `${prefix}_element-order-details-label-seller-name` }
            >
              { orderItems[0].seller }
            </td>
            <td
              data-testid={ `${prefix}_element-order-details-label-order-date` }
            >
              { formatDate(orderItems[0].saleDate) }
            </td>
            <td
              data-testid={ testId }
            >
              { orderItems[0].status }
            </td>
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        data-testid={ `${prefix}_button-delivery-check` }
        // disabled={ orderItems[0].status !== 'Em trânsito' }
        disabled
      >
        Marcar como entregue
      </button>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitario</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((orderItem, index) => CustomerOrderDetailRow(orderItem, index))}
        </tbody>
      </table>
      <span
        data-testid="customer_order_details__element-order-total-price"
      >
        { String(Number(orderItems[0].total).toFixed(2)).replace(/\./, ',') }
      </span>
    </div>
  );
}

export default CustomerOrderDetail;
