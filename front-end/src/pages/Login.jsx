import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActiveButton, setIsActiveButton] = useState(true);

  function handleButton() {
    const NUMBER_MIN = 5;
    const regexEmail = /\S+@\S+\.\S+/;
    const validEmail = regexEmail.test(email);
    const validPassword = password.length >= NUMBER_MIN;
    const validData = (!validEmail || !validPassword);
    setIsActiveButton(validData);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
    handleButton();
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    handleButton();
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios.post('http://localhost:3001/login', {
      email,
      password,
    }, {
      mode: 'no-cors',
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="Login">
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
        >
          Ainda não tenho conta
        </button>
        <span
          id="error-msg"
          data-testid="common_login__element-invalid-email"
        />
      </form>
    </div>
  );
}

export default Login;
