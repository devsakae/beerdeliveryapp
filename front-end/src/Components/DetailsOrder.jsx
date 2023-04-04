import React, { useState, useEffect } from 'react';
import { requestRole } from '../services/request';

export default function DetailsOrder() {
  const [seller, setSeller] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [listSellers, setListSellers] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
  }

  useEffect(() => {
    try {
      const getRole = async () => {
        const list = await requestRole('/login/role');
        setListSellers(list);
      }; getRole();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <h3>Detalhes e Endereço para Entrega</h3>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="seller">
          P. Vendedora Responsável:
          <select
            onChange={ ({ target: { value } }) => setSeller(value) }
            data-testid="customer_checkout__select-seller"
            name="seller"
            value={ seller }
          >
            {listSellers.length > 0 && (
              listSellers.map((s, i) => (
                <option key={ `${s.name}-${i}` }>{s.name}</option>
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
        >
          Finalizar Pedido
        </button>
      </form>
    </div>
  );
}
