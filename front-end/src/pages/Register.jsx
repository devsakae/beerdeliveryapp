import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const MIN_NAME_LENGTH = 12;
const MIN_PASSWORD_LENGTH = 6;
const regexEmail = /\S+@\S+\.\S+/;

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    setExistantUser(false);
    event.preventDefault();
    axios.post('http://localhost:3001/register', {
      name,
      email,
      password,
    }, {
      mode: 'no-cors',
    })
      .then((response) => {
        if (response.status === 201) history.push('/customer/products');
        else alert('Erro no cadastro');
      })
      .catch((error) => {
        if (error.status === 409) setExistantUser(true);
        else alert('Erro no cadastro');
        return;
      });
  }
  // Estamos usando react-router-dom v5.6.1, que não tem suporte para Navigate
  // { userLoggedIn && <Navigate to="/customers/products" /> }
  return (
    <div className="Login">
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
        { existantUser &&
          (
          <span id="error-msg" data-testid="common_register__element-invalid_register">
            Usuário já cadastrado
          </span>
          )
        }
      </form>
    </div>
  );
}

export default Register;
