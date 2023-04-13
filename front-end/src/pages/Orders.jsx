import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Components/Layout';
import { getFromLocalStorage } from '../services/localStorage';

const PATH = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

function Orders() {
  const [token] = useState(getFromLocalStorage('user').token);
  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    const user = getFromLocalStorage('user') || {};
    const { id } = user;
    console.log(id);
    axios.get(`${PATH}/sales/customer/${id}`, { mode: 'no-cors' })
      .then(({ data }) => { setOrdersList(data); }).catch((err) => console.log(err));
  }, [token]);

  const formatDate = (notFormattedDate) => {
    const date = new Date(notFormattedDate);
    return `${date.getDate()
      .toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <Layout>
      {ordersList.length > 0 && (
        ordersList.map((order, index) => (
          <Link style={{ display: 'flex', gap: '10px' }} key={ index } to={ `/customer/orders/${order.id}` }>
            <p data-testid={ `customer_orders__element-order-id-${order.id}` }>
              {order.id}
            </p>
            <p data-testid={ `customer_orders__element-delivery-status-${order.id}` }>
              {order.status}
            </p>
            <p data-testid={ `customer_orders__element-order-date-${order.id}` }>
              { formatDate(order.saleDate) }
            </p>
            <p data-testid={ `customer_orders__element-card-price-${order.id}` }>
              { order.totalPrice.split('.').join(',') }
            </p>
          </Link>
        ))
      )}
    </Layout>
  );
}

export default Orders;
