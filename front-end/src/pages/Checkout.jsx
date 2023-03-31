import React, { useState } from 'react';
import DetailsOrder from '../Components/DetailsOrder';
import Header from '../Components/Header';
import TableOrder from '../Components/TableOrder';

function Checkout() {
  const [orderItens, setOrderItens] = useState([
    {
      descricao: 'asdasd',
      quantidade: 2,
      valorUnitario: 3.50,
    },
  ]);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0.00);

  function calculateTotalOrderPrice() {
    const total = orderItens.map((item) => (item.quantidade * item.valorUnitario))
      .reduce((acc, curr) => acc + curr);
    setTotalOrderPrice(total);
  }

  function deleteItem(position) {
    const newOrderItens = [...orderItens];
    newOrderItens.splice(position, 1);
    setOrderItens(newOrderItens);
    calculateTotalOrderPrice();
  }
  return (
    <div>
      <Header />
      <TableOrder
        orderItens={ orderItens }
        total={ totalOrderPrice }
        deleteItem={ (pos) => deleteItem(pos) }
      />
      <DetailsOrder />
    </div>
  );
}

export default Checkout;
