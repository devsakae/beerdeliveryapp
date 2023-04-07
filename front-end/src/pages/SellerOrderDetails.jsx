import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import StatusOrder from '../Components/StatusOrder';
import TableSellersOdersDetails from '../Components/TableSellerOrdersDetails';
import { getFromLocalStorage } from '../services/localStorage';

const path = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

export default function SellerOrderDetails() {
  const [order, setOrder] = useState({});
  // const [status, setStatus] = useState('');
  const { id } = useParams();

  const changeStatus = () => {
    const { token } = getFromLocalStorage('user');
    let actualStatus = 'Preparando';
    if (order.status === actualStatus) actualStatus = 'Em Trânsito';
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
      .then((response) => {
        setOrder(response.data);
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const { token } = getFromLocalStorage('user');
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
      .then((response) => {
        setOrder(response.data);
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <Header />
      <StatusOrder order={ order } changeStatus={ changeStatus } />
      <TableSellersOdersDetails />
    </>
  );
}
