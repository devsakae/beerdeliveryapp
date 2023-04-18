import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import LayoutRoot from '../Components/LayoutRoot';
import OAuth from '../Components/OAuth';
import { saveToLocalStorage } from '../services/localStorage';
import './Login.css';

const MIN_NAME_LENGTH = 12;
const MIN_PASSWORD_LENGTH = 6;
const regexEmail = /\S+@\S+\.\S+/;
const SUCCESSFULL_STATUS = 201;

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isActiveButton, setIsActiveButton] = useState(true);
  const [existantUser, setExistantUser] = useState(false);
  const history = useHistory();

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
    axios.post(`${process.env.REACT_APP_HOSTNAME}/register`, {
      name,
      email,
      password,
    }, {
      mode: 'no-cors',
    })
      .then((response) => {
        if (response.status === SUCCESSFULL_STATUS) {
          saveToLocalStorage('user', response.data);
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
    <LayoutRoot>
      <form onSubmit={ handleSubmit } className="userbox">
        <h2>Faça seu registro!</h2>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            placeholder="Nome completo"
            value={ name }
            data-testid="common_register__input-name"
            onChange={ handleNameChange }
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={ email }
            data-testid="common_register__input-email"
            onChange={ handleEmailChange }
          />
        </label>
        <label htmlFor="password">
          <input
            type={ showPassword ? 'text' : 'password' }
            name="password"
            placeholder="Senha"
            value={ password }
            data-testid="common_register__input-password"
            onChange={ handlePasswordChange }
          />
          {showPassword ? (
            <AiFillEyeInvisible
              onClick={() => setShowPassword(false)}
              className="showpassword"
            />
          ) : (
            <AiFillEye
              onClick={() => setShowPassword(true)}
              className="showpassword"
            />
          )}
        </label>
        <button
          type="submit"
          data-testid="common_register__button-register"
          disabled={ isActiveButton }
          className="css-button-arrow--black"
          onClick={ handleSubmit }
        >
          Cadastrar
        </button>
        <OAuth />
        <button
          type="submit"
          onClick={ () => history.push('/login') }
          className="redirectBtn"
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
    </LayoutRoot>
  );
}
