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
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="endereço@email.com"
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
        </label>
        <label htmlFor="role">
          <select id="role" name="role">
            <option>Vendedor</option>
            <option>Cliente</option>
            <option>Administrador</option>
          </select>
        </label>
      </form>
    </>
  );
}
