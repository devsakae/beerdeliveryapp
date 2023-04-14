import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TotalPriceBox from './TotalPriceBox';

const PATH = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

export default function TableSellersOdersDetails() {
  const [sale, setSale] = useState([]);
  const [total, setTotal] = useState(0);
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
        const sumProductsSold = response.data.reduce((acc, cur) => {
          acc += (Number(cur.price) * Number(cur.quantity));
          return acc;
        }, 0);
        setTotal(sumProductsSold);
        setSale(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
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
      <TotalPriceBox data-testid="seller_order_details__element-order-total-price">
        {`Total: R$ ${new Intl.NumberFormat('pt-br', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
          .format(total)}`}
      </TotalPriceBox>
    </div>
  );
}
