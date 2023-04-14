import axios from 'axios';
import React, { useRef } from "react";
import { getFromLocalStorage } from '../services/localStorage';
import './AdminAddUser.css';
const api = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

export default function AdminAddProduct({ handleWarning }) {
  const inputName = useRef();
  const inputPrice = useRef();
  const inputImage = useRef();
  const { token } = getFromLocalStorage('user');

  const createProduct = (event) => {
    event.preventDefault();
    const payload = {
      name: inputName.current.value,
      price: inputPrice.current.value,
      urlImage: inputImage.current.value,
    };
    axios.post(`${api}/products`, payload, { headers: { Authorization: token }, mode: 'no-cors' })
    .then((response) => handleWarning(`Item ${response.data.name} adicionado com sucesso`))
    .catch((err) => handleWarning(err.message));
  };

  return (
    <section>
      <h2>Adicionar novo produto</h2>
      <form className="addNewUser">
        <label htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Descrição do produto"
            ref={ inputName }
          />
        </label>
        <label htmlFor="price">
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Valor unitário"
            ref={ inputPrice }
          />
        </label>
        <label htmlFor="imageurl">
          <input
            id="imageurl"
            name="imageurl"
            type="text"
            placeholder="URL da imagem"
            ref={ inputImage }
          />
        </label>
        <button
          type="button"
          onClick={ createProduct }
        >
          Cadastrar
        </button>
      </form>
    </section>
  );
}
