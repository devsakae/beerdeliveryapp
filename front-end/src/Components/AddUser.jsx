import React from 'react';

export default function AddUser() {
  return (
    <>
      <h2>Cadastrar novo usuário</h2>
      <form>
        <label htmlFor="nome">
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome e sobrenome"
            data-testid="admin_manage__input-name"
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="endereço@email.com"
            data-testid="admin_manage__input-email"
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            data-testid="admin_manage__input-password"
          />
        </label>
        <label htmlFor="role">
          <select
            id="role"
            name="role"
            data-testid="admin_manage__select-role"
          >
            <option>Vendedor</option>
            <option>Cliente</option>
            <option>Administrador</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ () => console.log('Clique!') }
          data-testid="admin_manage__button-register"
        >
          Cadastrar
        </button>
      </form>
    </>
  );
}
