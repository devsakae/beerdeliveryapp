import React, { useContext } from 'react';
import MyContext from '../Context/SellerDetailsContext';

export default function SellersOdersDetails() {
  const { productsById, salesProduct } = useContext(MyContext);

  const newArr = productsById.map((product) => {
    const sProducts = salesProduct.filter((sp) => sp.productId === product.id);
    return {
      ...product,
      ...sProducts[0],
    };
  });

  const subTotal = (quantity, price) => {
    const result = (quantity * price).toFixed(2);
    return result.toString().replace(/\./, ',');
  };

  return (
    <div>
      {newArr.map((product, index) => (
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
      ))}
    </div>
  );
}
