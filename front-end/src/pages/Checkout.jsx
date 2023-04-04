import React from 'react';
import DetailsOrder from '../Components/DetailsOrder';
import Header from '../Components/Header';
import TableOrder from '../Components/TableOrder';

function Checkout() {
  return (
    <div>
      <Header />
      <TableOrder />
      <DetailsOrder />
    </div>
  );
}

export default Checkout;
