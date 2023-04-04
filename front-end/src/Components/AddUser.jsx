import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AddUser.css';

const MIN_NAME_LENGTH = 12;
const MIN_PASSWORD_LENGTH = 6;
const regexEmail = /\S+@\S+\.\S+/;
const SUCCESSFULL_STATUS = 201;
const THREE_SECONDS_IN_MS = 3000;

export default function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [isActiveButton, setIsActiveButton] = useState(false);
  const [error, setError] = useState('');
  const PATH = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

  useEffect(() => {
    const validName = name.length >= MIN_NAME_LENGTH;
    const validEmail = regexEmail.test(email);
    const validPassword = password.length >= MIN_PASSWORD_LENGTH;
    const validData = (!validEmail || !validPassword || !validName);
    setIsActiveButton(validData);
  }, [name, email, password]);

  const clearInputs = () => {
    setEmail('');
    setName('');
    setPassword('');
  };
  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleRoleChange = (event) => setRole(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${PATH}/admin/newuser`, {
      name,
      email,
      password,
      role,
    }, {
      mode: 'no-cors',
    })
      .then((response) => {
        if (response.status === SUCCESSFULL_STATUS) {
          setError('Usuário criado com sucesso!');
          setTimeout(() => setError(''), THREE_SECONDS_IN_MS);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => clearInputs());
  };

  return (
    <section>
      <div
        className="messagebox"
        data-testid="admin_manage__element-invalid-register"
        hidden={ !error }
      >
        { error }
      </div>
      <h2>Cadastrar novo usuário</h2>
      <form className="addNewUser">
        <label htmlFor="nome">
          <input
            type="text"
            id="nome"
            name="nome"
            value={ name }
            placeholder="Nome e sobrenome"
            data-testid="admin_manage__input-name"
            onChange={ handleNameChange }
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            name="email"
            value={ email }
            placeholder="endereço@email.com"
            data-testid="admin_manage__input-email"
            onChange={ handleEmailChange }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            name="password"
            value={ password }
            placeholder="Password"
            data-testid="admin_manage__input-password"
            onChange={ handlePasswordChange }
          />
        </label>
        <label htmlFor="role">
          <select
            id="role"
            name="role"
            data-testid="admin_manage__select-role"
            onChange={ handleRoleChange }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ handleSubmit }
          data-testid="admin_manage__button-register"
          disabled={ isActiveButton }
        >
          Cadastrar
        </button>
      </form>
    </section>
  );
}
