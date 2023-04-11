import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getFromLocalStorage } from '../services/localStorage';
import Header from '../Components/Header';

const PATH = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

function Orders() {
  const [token] = useState(getFromLocalStorage('user').token);
  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    axios.get(`${PATH}/sales`, { headers: { Authorization: token } }, { mode: 'no-cors' })
      .then(({ data }) => { setOrdersList(data); }).catch((err) => console.log(err));
  }, [token]);

  return (
    <section>
      <Header />
      <ul>
        {ordersList.length > 0 && (
          ordersList.map((order, index) => (
            <Link key={ index } to={ `/customer/orders/${order.id}` }>
              <p data-testid={ `customer_orders__element-order-id-${order.id}` }>
                {order.id}
              </p>
              <p data-testid={ `customer_orders__element-delivery-status-${order.id}` }>
                {order.status}
              </p>
              <p data-testid={ `customer_orders__element-order-date-${order.id}` }>
                {order.saleDate}
              </p>
              <p data-testid={ `customer_orders__element-card-price-${order.id}` }>
                {order.totalPrice}
              </p>
            </Link>
          ))
        )}
      </ul>
    </section>
  );
}

export default Orders;
