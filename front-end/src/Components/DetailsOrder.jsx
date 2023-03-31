import React, { useState } from 'react';

export default function DetailsOrder() {
  const [seller, setSeller] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');

  function handleSellerChange({ target }) {
    setSeller(target.value);
  }

  function handleAddressChange({ target }) {
    setAddress(target.value);
  }

  function handleNumberChange({ target }) {
    setNumber(target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log();
    // axios.post('http://localhost:3001/login', {
    //   email,
    //   password,
    // }, {
    //   mode: 'no-cors',
    // })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  return (
    <div>
      <h3>Detalhes e Endereço para Entrega</h3>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="seller">
          P. Vendedora Responsável:
          <input
            type="text"
            id="seller"
            name="seller"
            value={ seller }
            onChange={ handleSellerChange }
            data-testid="customer_checkout__select-seller"
          />
        </label>
        <label htmlFor="address">
          Endereço:
          <input
            type="text"
            id="address"
            name="address"
            value={ address }
            onChange={ handleAddressChange }
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
            onChange={ handleNumberChange }
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
