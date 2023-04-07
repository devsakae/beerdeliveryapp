import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import cartContext from '../Context/CartContext';
import { getFromLocalStorage } from '../services/localStorage';
// Refatoramos porque quebrou reqs 25, 27, 28, 29.
// import { request, requestRole } from '../services/request';

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
      .get('http://localhost:3001/login/role')
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

  // const registerSaleProductsOnDB = async (saleId, saleProducts) => {
  //   axios
  //     .post(
  //       `http://localhost:3001/sales/products/${saleId}`,
  //       saleProducts,
  //       { mode: 'no-cors' },
  //     )
  //     .then((response) => {
  //       console.log('salvou no DB o seguinte:', response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // Refatoramos porque quebrou reqs 25, 27, 28, e 29
  const registerSaleOnDB = async (payload) => {
    const { token } = getFromLocalStorage('user');
    const saleProducts = cart.filter((p) => p.quantity > 0)
      .map((p) => ({
        productId: p.item.id,
        quantity: p.quantity,
      }));
    // console.log('saleProducts:', saleProducts);
    axios
      .post(
        'http://localhost:3001/sales',
        {
          payload,
          saleProducts,
        },
        { headers: { Authorization: token } },
        { mode: 'no-cors' },
      )
      .then((response) => {
        setIdOrder(response.data);
        // console.log('salvou no DB o seguinte:', response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const registerSale = () => {
    const listSoldProducts = cart.filter((p) => p.quantity > 0);
    const sumProductsSold = listSoldProducts.reduce((acc, cur) => {
      acc += (Number(cur.item.price) * Number(cur.quantity));
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
      <h3>Detalhes e Endereço para Entrega</h3>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="seller">
          P. Vendedora Responsável:
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
        </label>
        <label htmlFor="address">
          Endereço:
          <input
            type="text"
            id="address"
            name="address"
            value={ address }
            onChange={ ({ target: { value } }) => setAddress(value) }
            data-testid="customer_checkout__input-address"
          />
        </label>
        <label htmlFor="number">
          Número:
          <input
            type="number"
            id="number"
            name="number"
            value={ number }
            onChange={ ({ target: { value } }) => setNumber(value) }
            data-testid="customer_checkout__input-address-number"
          />
        </label>
        <button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
          onClick={ registerSale }
        >
          Finalizar Pedido
        </button>
      </form>
    </div>
  );
}
