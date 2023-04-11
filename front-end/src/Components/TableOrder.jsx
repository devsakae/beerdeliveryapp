import React, { useContext, useEffect } from 'react';
import cartContext from '../Context/CartContext';
import ProductItem from './ProductItem';

export default function TableOrder() {
  const {
    cart,
    pegaCarrinho,
    total,
  } = useContext(cartContext);

  useEffect(() => {
    pegaCarrinho();
  }, [pegaCarrinho]);

  return (
    <div>
      <h2>Finalizar Pedido</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-Total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          { cart?.filter((p) => p.quantity > 0).map((prod, idx) => (
            <ProductItem i={ idx } key={ idx } prod={ prod } />
          ))}
        </tbody>
      </table>
      <p
        data-testid="customer_checkout__element-order-total-price"
      >
        {`Total: R$${new Intl.NumberFormat('pt-br', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
          .format(total)}`}
      </p>
    </div>
  );
}
