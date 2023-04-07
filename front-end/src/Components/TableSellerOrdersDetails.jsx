import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PATH = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

export default function TableSellersOdersDetails() {
  const [sale, setSale] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `${PATH}/products/sale/${id}`,
        {},
        {
          mode: 'no-cors',
        },
      )
      .then((response) => {
        console.log(response);
        setSale(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
      </thead>
      <tbody>
        { !loading && sale.map((product, index) => (
          <tr key={ index }>
            <td
              data-testid={
                `seller_order_details__element-order-table-item-number-${index}`
              }
            >
              {index + 1}
            </td>
            <td
              data-testid={ `seller_order_details__element-order-table-name-
                ${index}` }
            >
              {product.name}
            </td>
            <td
              data-testid={ `seller_order_details__element-order-table-quantity-
                ${index}` }
            >
              {product.quantity}
            </td>
            <td
              data-testid={
                `seller_order_details__element-order-table-unit-price-${index}`
              }
            >
              { `R$ ${product.price.replace('.', ',')}` }
            </td>
            <td
              data-testid={
                `seller_order_details__element-order-table-sub-total-${index}`
              }
            >
              { `R$ ${product.sub_total.replace('.', ',')}` }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
