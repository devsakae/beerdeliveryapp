import React, { useContext, useEffect, useState } from 'react';
import AdminContext from '../Context/AdminContext';
import './AddUser.css';

const MIN_NAME_LENGTH = 12;
const MIN_PASSWORD_LENGTH = 6;
const regexEmail = /\S+@\S+\.\S+/;

export default function AddUser() {
  const [isActiveButton, setIsActiveButton] = useState(false);
  const Context = useContext(AdminContext);

  useEffect(() => {
    const validName = Context.name.length >= MIN_NAME_LENGTH;
    const validEmail = regexEmail.test(Context.email);
    const validPassword = Context.password.length >= MIN_PASSWORD_LENGTH;
    const validData = (!validEmail || !validPassword || !validName);
    setIsActiveButton(validData);
  }, [Context.name, Context.email, Context.password]);

  return (
    <section>
      <div
        className="messagebox"
        data-testid="admin_manage__element-invalid-register"
        hidden={ !Context.error }
      >
        { Context.error }
      </div>
      <h2>Cadastrar novo usuário</h2>
      <form className="addNewUser">
        <label htmlFor="nome">
          <input
            type="text"
            id="nome"
            name="nome"
            value={ Context.name }
            placeholder="Nome e sobrenome"
            data-testid="admin_manage__input-name"
            onChange={ Context.handleNameChange }
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            name="email"
            value={ Context.email }
            placeholder="endereço@email.com"
            data-testid="admin_manage__input-email"
            onChange={ Context.handleEmailChange }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            name="password"
            value={ Context.password }
            placeholder="Password"
            data-testid="admin_manage__input-password"
            onChange={ Context.handlePasswordChange }
          />
        </label>
        <label htmlFor="role">
          <select
            id="role"
            name="role"
            data-testid="admin_manage__select-role"
            onChange={ Context.handleRoleChange }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ Context.handleSubmit }
          data-testid="admin_manage__button-register"
          disabled={ isActiveButton }
        >
          Cadastrar
        </button>
      </form>
    </section>
  );
}
