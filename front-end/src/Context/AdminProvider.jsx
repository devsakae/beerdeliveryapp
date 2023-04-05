import axios from 'axios';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getFromLocalStorage } from '../services/localStorage';
import AdminContext from './AdminContext';

const API_HOST = process.env.REACT_APP_HOSTNAME;
const API_PORT = process.env.REACT_APP_BACKEND_PORT;
const SUCCESSFULL_STATUS = 201;
const THREE_SECONDS_IN_MS = 3000;

export default function AdminProvider({ children }) {
  const [userLogged, setUserLogged] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [error, setError] = useState('');
  const PATH = `http://${API_HOST}:${API_PORT}`;

  useEffect(() => {
    const userData = getFromLocalStorage('user');
    setUserLogged(userData);
  }, []);

  const clearInputs = () => {
    setEmail('');
    setName('');
    setPassword('');
  };
  const handleName = useCallback((event) => setName(event.target.value), []);
  const handleEmail = useCallback((event) => setEmail(event.target.value), []);
  const handlePassword = useCallback((event) => setPassword(event.target.value), []);
  const handleRole = useCallback((event) => setRole(event.target.value), []);
  const handleError = useCallback((arg) => setError(arg), []);
  const createNewUser = useCallback(() => {
    axios.post(`${PATH}/admin/newuser`, {
      name,
      email,
      password,
      role,
    }, {
      headers: {
        Authorization: userLogged.token,
      },
      mode: 'no-cors',
    })
      .then((response) => {
        if (response.status === SUCCESSFULL_STATUS) {
          setError('Usuário criado com sucesso!');
          setTimeout(() => setError(''), THREE_SECONDS_IN_MS);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => clearInputs());
  }, [PATH, name, email, password, role, userLogged.token]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    createNewUser();
  }, [createNewUser]);

  const context = useMemo(() => ({
    userLogged,
    name,
    email,
    password,
    role,
    error,
    PATH,
    handleName,
    handleEmail,
    handlePassword,
    handleRole,
    handleSubmit,
    handleError,
  }), [userLogged, name, email, password, role, error, PATH,
    handleName, handleEmail, handlePassword,
    handleRole, handleSubmit, handleError]);

  return (
    <AdminContext.Provider value={ context }>
      { children }
    </AdminContext.Provider>
  );
}

AdminProvider.propTypes = {
  children: PropTypes.node,
}.isrequired;
