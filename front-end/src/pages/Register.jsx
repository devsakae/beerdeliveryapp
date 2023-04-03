import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { saveToLocalStorage } from '../services/localStorage';
import style from './User.module.css';

const MIN_NAME_LENGTH = 12;
const MIN_PASSWORD_LENGTH = 6;
const regexEmail = /\S+@\S+\.\S+/;
const SUCCESSFULL_STATUS = 201;

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActiveButton, setIsActiveButton] = useState(true);
  const [existantUser, setExistantUser] = useState(false);
  const history = useHistory();
  const PATH = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

  useEffect(() => {
    const validName = name.length >= MIN_NAME_LENGTH;
    const validEmail = regexEmail.test(email);
    const validPassword = password.length >= MIN_PASSWORD_LENGTH;
    const validData = (!validEmail || !validPassword || !validName);
    setIsActiveButton(validData);
  }, [name, email, password]);

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    setExistantUser(false);
    axios.post(`${PATH}/register`, {
      name,
      email,
      password,
    }, {
      mode: 'no-cors',
    })
      .then((response) => {
        if (response.status === SUCCESSFULL_STATUS) {
          saveToLocalStorage('fazo4_user', response.data);
          history.push('/customer/products');
        }
      })
      .catch((error) => {
        setExistantUser(true);
        console.log(error);
      });
  };
  // Estamos usando react-router-dom v5.6.1, que não tem suporte para Navigate
  // { userLoggedIn && <Navigate to="/customers/products" /> }
  return (
    <div className={ style.userBox }>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            name="name"
            value={ name }
            data-testid="common_register__input-name"
            onChange={ handleNameChange }
          />
        </label>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="common_register__input-email"
            onChange={ handleEmailChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            name="password"
            value={ password }
            data-testid="common_register__input-password"
            onChange={ handlePasswordChange }
          />
        </label>
        <button
          type="submit"
          data-testid="common_register__button-register"
          disabled={ isActiveButton }
        >
          Cadastrar
        </button>
        <button
          type="submit"
          onClick={ () => history.push('/login') }
        >
          Já tenho cadastro
        </button>
        <div
          id="error-msg"
          data-testid="common_register__element-invalid_register"
          hidden={ !existantUser }
        >
          Favor verificar sua conta
        </div>
      </form>
    </div>
  );
}
