import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { saveToLocalStorage } from '../services/localStorage';
import style from './User.module.css';

const MIN_PASSWORD_LENGTH = 5;
const regexEmail = /\S+@\S+\.\S+/;
const SUCCESSFULL_STATUS = 200;
const PATH = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActiveButton, setIsActiveButton] = useState(true);
  const [invalidUser, setInvalidUser] = useState(false);
  const history = useHistory();
  
  useEffect(() => {
    const validEmail = regexEmail.test(email);
    const validPassword = password.length >= MIN_PASSWORD_LENGTH;
    const validData = (!validEmail || !validPassword);
    setIsActiveButton(validData);
  }, [email, password]);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    setInvalidUser(false);
    axios.post(`${PATH}/login`, {
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
        setInvalidUser(true);
        console.log(error);
      });
  }

  return (
    <div className={ style.userBox }>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">
          Login:
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="common_login__input-email"
            onChange={ handleEmailChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            name="password"
            value={ password }
            data-testid="common_login__input-password"
            onChange={ handlePasswordChange }
          />
        </label>
        <button
          type="submit"
          data-testid="common_login__button-login"
          disabled={ isActiveButton }
        >
          Submit
        </button>
        <button
          type="submit"
          data-testid="common_login__button-register"
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho conta
        </button>
        <span
          id="error-msg"
          data-testid="common_login__element-invalid-email"
          hidden={ !invalidUser }
        >
          Favor verificar sua conta
        </span>
      </form>
    </div>
  );
}

export default Login;
