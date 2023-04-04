import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getFromLocalStorage } from '../services/localStorage';
import AdminContext from './AdminContext';
const API_HOST = process.env.REACT_APP_HOSTNAME
const API_PORT = process.env.REACT_APP_BACKEND_PORT

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
  const handleNameChange = useCallback((event) => setName(event.target.value), []);
  const handleEmailChange = useCallback((event) => setEmail(event.target.value), []);
  const handlePasswordChange = useCallback((event) => setPassword(event.target.value), []);
  const handleRoleChange = useCallback((event) => setRole(event.target.value), []);
  const handleError = useCallback((arg) => setError(arg), []);
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
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
        if (response.status === 201) {
          setError('Usuário criado com sucesso!');
          setTimeout(() => setError(''), 3000);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => clearInputs());
  }, []);

  const context = useMemo(() => ({
    userLogged,
    name,
    email,
    password,
    role,
    error,
    PATH,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleRoleChange,
    handleSubmit,
    handleError,
  }), [userLogged, name, email, password, role, error, PATH,
    handleNameChange, handleEmailChange, handlePasswordChange,
    handleRoleChange, handleSubmit, handleError]);

  return (
    <AdminContext.Provider value={ context }>
      { children }
    </AdminContext.Provider>
  );
}
