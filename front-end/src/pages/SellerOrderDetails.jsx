import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Components/Layout';
import StatusOrder from '../Components/StatusOrder';
import TableSellersOdersDetails from '../Components/TableSellerOrdersDetails';
import { getFromLocalStorage } from '../services/localStorage';

const path = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

export default function SellerOrderDetails() {
  const [order, setOrder] = useState({});
  const { id } = useParams();
  const { token } = getFromLocalStorage('user');

  useEffect(() => {
    axios.get(
      `${path}/sales/${id}`,
      {
        headers: {
          Authorization: token,
        },
      },
      {
        mode: 'no-cors',
      },
    )
      .then((response) => setOrder(response.data))
      .catch((err) => console.log(err));
  }, [id]);

  const changeStatus = () => {
    let actualStatus;
    (order.status === 'Pendente') ? actualStatus = 'Preparando' : actualStatus = 'Em Trânsito';
    axios.put(
      `${path}/sales/${id}`,
      {
        status: actualStatus,
      },
      {
        headers: {
          Authorization: token,
        },
      },
      {
        mode: 'no-cors',
      },
    )
      .then((response) => setOrder(response.data))
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <StatusOrder order={ order } changeStatus={ changeStatus } />
      <TableSellersOdersDetails />
    </Layout>
  );
}
