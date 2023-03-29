import React from 'react';

function Login() {
  return (
    <div className="Login">
      <form>
        <label htmlFor="email">
          Login:
          <input
            type="email"
            name="email"
            data-test-id="common_login__input-email"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            name="password"
            data-test-id="common_login__input-password"
          />
        </label>
        <input
          type="submit"
          value="Submit"
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
