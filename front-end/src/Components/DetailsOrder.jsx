import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { requestRole, request } from '../services/request';
import { getFromLocalStorage } from '../services/localStorage';
import cartContext from '../Context/CartContext';

export default function DetailsOrder() {
  const [seller, setSeller] = useState('2');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [listSellers, setListSellers] = useState([]);
  const [token, setToken] = useState('');
  const [idOrder, setIdOrder] = useState(false);
  const { cart } = useContext(cartContext);

  function handleSubmit(event) {
    event.preventDefault();
  }

  useEffect(() => {
    try {
      const getRole = async () => {
        const list = await requestRole('/login/role');
        setListSellers(list);
        setToken(getFromLocalStorage('user').token);
      }; getRole();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const registerSale = async () => {
    const listSoldProducts = cart.filter((p) => p.quantity > 0);
    const sumProductsSold = listSoldProducts.reduce((acc, cur) => {
      acc += Number(cur.item.price);
      return acc;
    }, 0);
    const date = new Date();
    const payload = {
      totalPrice: sumProductsSold,
      deliveryAddress: address,
      deliveryNumber: number,
      saleDate: date.getTime(),
      status: 'pendente',
      sellerId: Number(seller),
    };
    const registeredSaleId = await request('/sales', payload, token);
    setIdOrder(registeredSaleId);
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
            {listSellers.length > 0 && (
              listSellers.map((s, i) => (
                <option
                  key={ `${s.name}-${i}` }
                  value={ s.id }
                >
                  {s.name}
                </option>
              ))
            )}
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
