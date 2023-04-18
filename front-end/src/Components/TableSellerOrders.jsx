import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import cartContext from '../Context/CartContext';
const api = `https://${process.env.REACT_APP_HOSTNAME}`;

export default function TableSellerOrders() {
  const history = useHistory();
  const { formatPrice, formatDate } = useContext(cartContext);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios.get(`${api}/sales`)
      .then((response) => {
        setSales(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th onClick={ () => handleOrderList('id') }>Pedido</th>
          <th onClick={ () => handleOrderList('status') }>Status</th>
          <th>Data</th>
          <th>Preço</th>
          <th style={ { textAlign: 'left', paddingLeft: '15px' } }>Endereço</th>
        </tr>
      </thead>
      <tbody>
        {
          sales?.map((s, i) => (
            <tr
              key={ i }
              onClick={ () => history.push(`/seller/orders/${s.id}`) }
              style={ { cursor: 'pointer' } }
            >
              <td
                data-testid={ `seller_orders__element-order-id-${s.id}` }
              >
                { s.id }
              </td>
              <td
                data-testid={ `seller_orders__element-delivery-status-${s.id}` }
              >
                { s.status }
              </td>
              <td
                data-testid={ `seller_orders__element-order-date-${s.id}` }
              >
                { formatDate(s.saleDate) }
              </td>
              <td
                data-testid={ `seller_orders__element-card-price-${s.id}` }
              >
                { formatPrice(s.totalPrice) }
              </td>
              <td
                data-testid={ `seller_orders__element-card-address-${s.id}` }
                style={ { textAlign: 'left', paddingLeft: '15px' } }
              >
                { `${s.deliveryAddress}, ${s.deliveryNumber}` }
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
