import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomerOrderDetailStatus from '../Components/CustomerOrderDetailStatus';
import Layout from '../Components/Layout';
import ProductItem from '../Components/ProductItem';
import cartContext from '../Context/CartContext';
// const { useParams } = require('react-router-dom');

const PATH = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

function CustomerOrderDetail() {
  console.log('entrei no customer order');
  const { id } = useParams();
  const { formatPrice } = useContext(cartContext);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const prefix = 'customer_order_details_';
  const testId = `${prefix}_element-order-details-label-delivery-status${id}`;

  useEffect(() => {
    axios.get(`${PATH}/sale_product/${id}`)
      .then((response) => {
        setOrderItems(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);


  return (
    <Layout>
      { (orderItems.length === 0) ? (<div>Carregando...</div>) : (<h2>Detalhes do seu pedido</h2>) }
      { !loading && <CustomerOrderDetailStatus order={ orderItems[0] } id={ id } /> }
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th style={{ textAlign: 'left', paddingLeft: '15px' }}>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitario</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          { !loading && orderItems?.map((order, idx) => <ProductItem noBtn i={ idx } key={ idx } prod={ { quantity: order.quantity, item: { id: order.id, name: order.name, price: order.price } } } />) }
        </tbody>
      </table>
      <span
        data-testid="customer_order_details__element-order-total-price"
      >
        { !loading && formatPrice(orderItems[0].total) }
        {/* { String(Number(orderItems[0].total).toFixed(2)).replace(/\./, ',') } */}
      </span>
    </Layout>
  );
}

export default CustomerOrderDetail;
