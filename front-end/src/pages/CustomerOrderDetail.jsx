import React, { useState, useEffect } from 'react';
import CustomerOrderDetailRow from '../Components/CustomerOrderDetailRow';
import Header from '../Components/Header';

const { useParams } = require('react-router-dom');

function CustomerOrderDetail() {
  const { id } = useParams();
  const [total, setTotal] = useState(0);
  // const [order, setOrder] = useState({});
  // const [orderItems, setOrderItems] = useState([]);

  const prefix = 'customer_order_details_';

  const orderItems = [ // mock
    {
      id: 1,
      name: 'Item 1',
      price: 10,
      quantity: 2,
      subtotal: 20,
    },
  ];

  useEffect(() => {
    // const fetchOrder = async () => {
    //   const order = await getOrder(id);
    //   setOrder(order);
    //   setOrderItems(order.orderItems);
    // };
    // fetchOrder();
    // setTotal(orderItems.reduce((acc, { subtotal }) => acc + subtotal, 0));
    setTotal(1);
  }, [id]);

  return (
    <div>
      <Header />
      <table>
        <tbody>
          <tr>
            <td
              data-testid={ `${prefix}_element-order-details-label-order-id` }
            >
              Pedido 0001
            </td>
            <td
              data-testid={ `${prefix}_element-order-details-label-seller-name` }
            >
              Nome Vendedor
            </td>
            <td
              data-testid={ `${prefix}_element-order-details-label-order-date` }
            >
              12/12/24
            </td>
            <td
              data-testid={ `${prefix}_element-order-details-label-delivery-status${id}` }
            >
              Entregue
            </td>
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        data-testid={ `${prefix}_button-delivery-check` }
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
        {total}
      </span>
    </div>
  );
}

export default CustomerOrderDetail;
