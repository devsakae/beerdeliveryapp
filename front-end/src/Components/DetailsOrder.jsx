import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import cartContext from '../Context/CartContext';
import {
  getFromLocalStorage,
  removeKeyFromLocalStorage,
} from '../services/localStorage';
import './DetailsOrder.css';

export default function DetailsOrder() {
  const [seller, setSeller] = useState('2');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [listSellers, setListSellers] = useState([]);
  const [idOrder, setIdOrder] = useState(false);
  const { cart } = useContext(cartContext);

  function handleSubmit(event) {
    event.preventDefault();
  }

  const getRole = async () => {
    axios
      .get(`${process.env.REACT_APP_HOSTNAME}/login/role`)
      .then((response) => {
        setListSellers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRole();
  }, []);

  // Refatoramos porque quebrou reqs 25, 27, 28, e 29
  const registerSaleOnDB = async (payload) => {
    const { token } = getFromLocalStorage('user');
    const saleProducts = cart
      .filter((p) => p.quantity > 0)
      .map((p) => ({
        productId: p.item.id,
        quantity: p.quantity,
      }));
    axios
      .post(
        `${process.env.REACT_APP_HOSTNAME}/sales`,
        {
          payload,
          saleProducts,
        },
        { headers: { Authorization: token } },
        { mode: 'no-cors' },
      )
      .then((response) => {
        setIdOrder(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const registerSale = () => {
    removeKeyFromLocalStorage('fazo4_cart');
    const listSoldProducts = cart.filter((p) => p.quantity > 0);
    const sumProductsSold = listSoldProducts.reduce((acc, cur) => {
      acc += Number(cur.item.price) * Number(cur.quantity);
      return acc;
    }, 0);
    // console.log('sumProductsSold:', sumProductsSold);
    const date = new Date();
    const payload = {
      totalPrice: sumProductsSold,
      deliveryAddress: address,
      deliveryNumber: number,
      saleDate: date.getTime(),
      status: 'Pendente',
      sellerId: Number(seller),
    };
    registerSaleOnDB(payload);
  };

  if (idOrder) return <Redirect to={ `/customer/orders/${idOrder}` } />;

  return (
    <div>
      <h2>Detalhes e Endereço para Entrega</h2>
      <form onSubmit={ handleSubmit } className="formcontainer">
        <label htmlFor="seller" className="deliveryinfoline">
          <div className="deliverytext">P. Vendedora Responsável:</div>
          <div className="deliveryfield">
            <select
              onChange={ ({ target: { value } }) => setSeller(value) }
              data-testid="customer_checkout__select-seller"
              value={ seller }
            >
              {listSellers.length > 0
                && listSellers.map((s, i) => (
                  <option key={ `${s.name}-${i}` } value={ s.id }>
                    {s.name}
                  </option>
                ))}
            </select>
          </div>
        </label>
        <label htmlFor="address" className="deliveryinfoline">
          <div className="deliverytext">Endereço:</div>
          <div className="deliveryfield">
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Digite seu endereço completo"
              value={ address }
              onChange={ ({ target: { value } }) => setAddress(value) }
              data-testid="customer_checkout__input-address"
            />
          </div>
        </label>
        <label htmlFor="number" className="deliveryinfoline">
          <div className="deliverytext">Número:</div>
          <div className="deliveryfield">
            <input
              type="number"
              id="number"
              name="number"
              placeholder="Número"
              value={ number }
              onChange={ ({ target: { value } }) => setNumber(value) }
              data-testid="customer_checkout__input-address-number"
            />
          </div>
        </label>
        <button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
          onClick={ registerSale }
          className="submitBtn"
        >
          ENVIAR
        </button>
      </form>
    </div>
  );
}
