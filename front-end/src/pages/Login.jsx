import React, { useState } from 'react';
// import requestLogin from '../services/request';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const login = async (event) => {
  //   event.preventDefault();

  //   const a = await requestLogin('/login', { email, password });
  //   console.log(a);
  // };

  return (
    <div className="Login">
      <form method="POST" action="localhost:3001/login">
        <label htmlFor="email">
          Login:
          <input
            type="email"
            name="email"
            value={ email }
            data-test-id="common_login__input-email"
            onChange={ ({ target: { value } }) => setEmail(value) }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            name="password"
            value={ password }
            data-test-id="common_login__input-password"
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
        </label>
        <input
          type="submit"
          value="Submit"
          // onClick={ ({ target: { value } }) => login(value) }
          data-test-id="common_login__button-login"
        />
        <input
          type="button"
          value="Ainda não tenho conta"
          data-test-id="common_login__button-register"
        />
        <span
          id="error-msg"
          data-test-id="common_login__element-invalid-email"
        />
      </form>
    </div>
  );
}

export default Login;
