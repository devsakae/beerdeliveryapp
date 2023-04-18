import axios from 'axios';
import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import LayoutRoot from "../Components/LayoutRoot";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../services/localStorage";
import "./Login.css";

const MIN_PASSWORD_LENGTH = 6;
const regexEmail = /\S+@\S+\.\S+/;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isActiveButton, setIsActiveButton] = useState(true);
  const [invalidUser, setInvalidUser] = useState(false);
  const [warning, setWarning] = useState("");
  const history = useHistory();
  let goto = "/customer/products";

  useEffect(() => {
    const getUser = getFromLocalStorage("user") || {};
    if (getUser.role === "administrator") history.push("/admin/manage");
    if (getUser.role === "seller") history.push("/seller/orders");
    if (getUser.role === "customer") history.push(goto);
  }, [goto, history]);

  useEffect(() => {
    const validEmail = regexEmail.test(email);
    const validPassword = password.length >= MIN_PASSWORD_LENGTH;
    const validData = !validEmail || !validPassword;
    setIsActiveButton(validData);
  }, [email, password]);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    setInvalidUser(false);
    axios
      .post(
        `${process.env.REACT_APP_HOSTNAME}/login`,
        {
          email,
          password,
        }
      )
      .then((response) => {
        saveToLocalStorage("user", response.data);
        if (response.data.role === "administrator") goto = "/admin/manage";
        if (response.data.role === "seller") goto = "/seller/orders";
        history.push(goto);
      })
      .catch((error) => {
        setInvalidUser(true);
        setEmail("");
        setPassword("");
        setWarning(error.message);
      });
  };

  return (
    <LayoutRoot>
      <form className="userbox">
        <h2>Beer Delivery App</h2>
        <legend style={{ margin: '-20px 0 20px 0' }}>O jeito mais rápido de ficar bêbado</legend>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={email}
            data-testid="common_login__input-email"
            onChange={handleEmailChange}
          />
        </label>
        <label htmlFor="password">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Senha"
            value={password}
            data-testid="common_login__input-password"
            onChange={handlePasswordChange}
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
          data-testid="common_login__button-login"
          disabled={isActiveButton}
          className="css-button-arrow--black"
          onClick={ handleSubmit }
        >
          Login
        </button>
        <button
          type="submit"
          data-testid="common_login__button-register"
          onClick={() => history.push("/register")}
          className="redirectBtn"
        >
          Ainda não tenho conta
        </button>
        <div
          id="error-msg"
          data-testid="common_login__element-invalid-email"
          hidden={!invalidUser}
        >
          <p>Favor verificar sua conta</p>
          <legend>{ warning }</legend>
        </div>
      </form>
    </LayoutRoot>
  );
}

export default Login;
