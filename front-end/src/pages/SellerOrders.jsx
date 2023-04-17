import React from 'react';
import Layout from '../Components/Layout';
import TableSellerOrders from '../Components/TableSellerOrders';

export default function SellerOrders() {
  return (
    <Layout>
      <h2>Pedidos de clientes</h2>
      <p style={ { textAlign: 'center', marginTop: '-15px' } }>Clique no pedido para administrar a ordem</p>
      <TableSellerOrders />
    </Layout>
  );
}
