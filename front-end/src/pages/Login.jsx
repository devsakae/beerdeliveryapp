import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
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
        {/* <input
          type="submit"
          value="Submit"
          data-testid="common_login__button-login"
        /> */}
        <button
          type="submit"
          data-testid="common_login__button-login"
        >
          Submit
        </button>
        <button
          type="submit"
          data-testid="common_login__button-register"
        >
          Ainda não tenho conta
        </button>
        {/* <input
          type="button"
          value="Ainda não tenho conta"
          data-testid="common_login__button-register"
        /> */}
        <span
          id="error-msg"
          data-testid="common_login__element-invalid-email"
        />
      </form>
    </div>
  );
}

export default Login;
