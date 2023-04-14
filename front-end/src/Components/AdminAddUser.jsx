import React, { useEffect, useState } from 'react';
import './AdminAddUser.css';
const MIN_NAME_LENGTH = 12;
const MIN_PASSWORD_LENGTH = 6;
const regexEmail = /\S+@\S+\.\S+/;

export default function AddUser({ handleSubmit }) {
  const [isActiveButton, setIsActiveButton] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seller");

  const handleName = (event) => setName(event.target.value);
  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);
  const handleRole = (event) => setRole(event.target.value);

  useEffect(() => {
    const validName = name.length >= MIN_NAME_LENGTH;
    const validEmail = regexEmail.test(email);
    const validPassword = password.length >= MIN_PASSWORD_LENGTH;
    const validData = (!validEmail || !validPassword || !validName);
    setIsActiveButton(validData);
    return () => setIsActiveButton(validData);
  }, [name, email, password]);

  return (
    <section>
      <h2>Cadastrar novo usuário</h2>
      <form className="addNewUser">
        <label htmlFor="nome">
          <input
            type="text"
            id="nome"
            name="nome"
            value={ name }
            placeholder="Nome e sobrenome"
            data-testid="admin_manage__input-name"
            onChange={ handleName }
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            name="email"
            value={ email }
            placeholder="endereço@email.com"
            data-testid="admin_manage__input-email"
            onChange={ handleEmail }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            name="password"
            value={ password }
            placeholder="Password"
            data-testid="admin_manage__input-password"
            onChange={ handlePassword }
          />
        </label>
        <label htmlFor="role">
          <select
            id="role"
            name="role"
            data-testid="admin_manage__select-role"
            onChange={ handleRole }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ (event) => handleSubmit(event, { name, email, password, role }) }
          data-testid="admin_manage__button-register"
          disabled={ isActiveButton }
        >
          Cadastrar
        </button>
      </form>
    </section>
  );
}
