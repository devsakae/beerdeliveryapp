import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isActiveButton, setIsActiveButton] = useState(true);

  // function handleButton() {
  //   const NUMBER_MIN = 5;
  //   const regexEmail = /\S+@\S+\.\S+/;
  //   const validEmail = regexEmail.test(email);
  //   const validPassword = password.length >= NUMBER_MIN;
  //   const validData = (!validEmail || !validPassword);
  //   setIsActiveButton(validData);
  // }

  function handleNameChange(event) {
    setName(event.target.value);
    // handleButton();
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
    // handleButton();
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    // handleButton();
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
        <label htmlFor="name">
          Nome:
          <input
            type="name"
            name="name"
            value={ name }
            data-testid="common_register__input-name"
            onChange={ handleNameChange }
          />
        </label>
        <label htmlFor="email">
          Login:
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
          // disabled={ isActiveButton }
        >
          Cadastrar
        </button>
        <span
          id="error-msg"
          data-testid="common_register__element-invalid_register"
        />
      </form>
    </div>
  );
}

export default Register;
