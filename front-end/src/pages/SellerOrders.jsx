import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function SellerOrders() {
  const history = useHistory();
  const [sales, setSales] = useState([]);
  useEffect(() => {
    async function fetchSales() {
      const response = await fetch('http://localhost:3001/sales');
      const salesData = await response.json();
      setSales(salesData);
    }
    fetchSales();
  }, []);
  return (
    <table>
      <thead>
        <tr>
          <th>Pedido</th>
          <th>Status</th>
          <th>Data</th>
          <th>Preço</th>
          <th>Endereço</th>
        </tr>
      </thead>
      <tbody>
        {
          sales.map((s, i) => (
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
                { s.saleDate }
              </td>
              <td
                data-testid={ `seller_orders__element-card-price-${s.id}` }
              >
                { s.totalPrice }
              </td>
              <td
                data-testid={ `seller_orders__element-card-address-${s.id}` }
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
