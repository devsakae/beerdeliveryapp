import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../Components/Layout';
import { getFromLocalStorage } from '../services/localStorage';
import './Orders.css';

const PATH = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

function Orders() {
  const [token] = useState(getFromLocalStorage('user').token);
  const [ordersList, setOrdersList] = useState([]);
  const history = useHistory();
  const transit = (is) => is.status === 'Em Trânsito';

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
      <table>
        <thead>
          <tr>
            <th>Order id</th>
            <th>Status</th>
            <th>Data do pedido</th>
            <th>Valor total</th>
          </tr>
        </thead>
        <tbody>
          {ordersList.length > 0 && (
            ordersList.map((order, index) => (
              <tr className={ `content ${transit(order) && 'transit'} ${order.status}` } key={ index } onClick={ () => history.push(`/customer/orders/${order.id}`) }>
                <td data-testid={ `customer_orders__element-order-id-${order.id}` }>
                  {order.id}
                </td>
                <td className="bigger" data-testid={ `customer_orders__element-delivery-status-${order.id}` }>
                  {order.status}
                </td>
                <td data-testid={ `customer_orders__element-order-date-${order.id}` }>
                  { formatDate(order.saleDate) }
                </td>
                <td data-testid={ `customer_orders__element-card-price-${order.id}` }>
                  { `R$ ${order.totalPrice.split('.').join(',')}` }
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Layout>
  );
}

export default Orders;
