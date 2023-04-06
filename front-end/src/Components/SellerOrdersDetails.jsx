import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PATH = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

export default function SellersOdersDetails() {
  const [sale, setSale] = useState([]);
  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    axios.get(`${PATH}/products/sale/1`, {
    }, {
      mode: 'no-cors',
    })
      .then((response) => {
        setSale(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {/* {newArr.map((product, index) => (
        <table key={ index }>
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
            <tr>
              <th
                data-testid={ `seller_order_details__element-order-table-item-number-
                ${index}` }
              >
                {index + 1}
              </th>
              <th
                data-testid={ `seller_order_details__element-order-table-name-
                ${index}` }
              >
                {product.name}
              </th>
              <th
                data-testid={ `seller_order_details__element-order-table-quantity-
                ${index}` }
              >
                { product.quantity }
              </th>
              <th>
                R$
                <p
                  data-testid={ `seller_order_details__element-order-table-unit-price-
                  ${index}` }
                >
                  { product.price.replace('.', ',') }
                </p>
              </th>
              <th>
                R$
                <p
                  data-testid={ `seller_order_details__element-order-table-sub-total-
                  ${index}` }
                >
                  { subTotal(product.quantity, product.price) }
                </p>
              </th>
            </tr>
          </tbody>
        </table>
      ))} */}
    </div>
  );
}
