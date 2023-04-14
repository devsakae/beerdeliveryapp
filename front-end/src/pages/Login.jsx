import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getFromLocalStorage, saveToLocalStorage } from '../services/localStorage';
import './Login.css';

const MIN_PASSWORD_LENGTH = 6;
const regexEmail = /\S+@\S+\.\S+/;
const SUCCESSFULL_STATUS = 200;
const PATH = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActiveButton, setIsActiveButton] = useState(true);
  const [invalidUser, setInvalidUser] = useState(false);
  const history = useHistory();
  let goto = '/customer/products';

  useEffect(() => {
    const getUser = getFromLocalStorage('user') || {};
    if (getUser.role === 'administrator') history.push('/admin/manage');
    if (getUser.role === 'seller') history.push('/seller/orders');
    if (getUser.role === 'customer') history.push(goto);
  }, [goto, history]);

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
          saveToLocalStorage('user', response.data);
          if (response.data.role === 'administrator') goto = '/admin/manage';
          if (response.data.role === 'seller') goto = '/seller/orders';
          history.push(goto);
        }
      })
      .catch((error) => {
        setInvalidUser(true);
        setEmail('');
        setPassword('');
        console.log(error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={ handleSubmit } className='userbox'>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            placeholder='E-mail'
            value={ email }
            data-testid="common_login__input-email"
            onChange={ handleEmailChange }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            placeholder='Senha'
            value={ password }
            data-testid="common_login__input-password"
            onChange={ handlePasswordChange }
          />
        </label>
        <button
          type="submit"
          data-testid="common_login__button-login"
          disabled={ isActiveButton }
          className='css-button-arrow--black'
        >
          Login
        </button>
        <button
          type="submit"
          data-testid="common_login__button-register"
          onClick={ () => history.push('/register') }
          className='redirectBtn'
        >
          Ainda não tenho conta
        </button>
        <div
          id="error-msg"
          data-testid="common_login__element-invalid-email"
          hidden={ !invalidUser }
        >
          Favor verificar sua conta
        </div>
      </form>
    </div>
  );
}

export default Login;
