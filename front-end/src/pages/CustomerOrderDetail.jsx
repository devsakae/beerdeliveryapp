import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomerOrderDetailStatus from '../Components/CustomerOrderDetailStatus';
import Layout from '../Components/Layout';
import ProductItem from '../Components/ProductItem';
import WarningBox from '../Components/WarningBox';
import cartContext from '../Context/CartContext';

const PATH = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

function CustomerOrderDetail() {
  const { id } = useParams();
  const { formatPrice } = useContext(cartContext);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState('');

  const handleWarning = (content) => {
    setWarning(content);
    setTimeout(() => setWarning(''), 5000)
  };

  useEffect(() => {
    axios.get(`${PATH}/sale_product/${id}`)
      .then((response) => setOrderItems(response.data))
      .catch((err) => handleWarning(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <Layout>
      { warning && <WarningBox content={ warning } /> }
      { loading ? (<div>Carregando...</div>) : (<h2>Detalhes do seu pedido</h2>) }
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
      <p
        data-testid="customer_order_details__element-order-total-price"
        style={{ textAlign: 'right', marginRight: '80px' }}
      >
        { !loading && formatPrice(orderItems[0].total) }
      </p>
    </Layout>
  );
}

export default CustomerOrderDetail;
