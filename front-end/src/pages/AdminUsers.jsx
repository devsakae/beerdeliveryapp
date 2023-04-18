import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminAddUser from '../Components/AdminAddUser';
import AdminUserList from '../Components/AdminUserList';
import Layout from '../Components/Layout';
import WarningBox from '../Components/WarningBox';

const SECONDS_IN_MS = 5000;

export default function Admin() {
  const userInfo = JSON.parse(localStorage.getItem('user')) || {};
  const { token } = userInfo;
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [warning, setWarning] = useState('');

  const handleWarning = (content) => {
    setWarning(content);
    setTimeout(() => setWarning(''), SECONDS_IN_MS);
  };

  const handleSubmit = (event, data) => {
    event.preventDefault();
    const { name, email, password, role } = data;
    axios
      .post(
        `${process.env.REACT_APP_HOSTNAME}/admin/newuser`,
        {
          name,
          email,
          password,
          role,
        },
        {
          headers: {
            Authorization: token,
          },
        },
        {
          mode: 'no-cors',
        },
      )
      .then((response) => {
        setUsers((prev) => [...prev, response.data]);
        handleWarning('Usuário criado com sucesso!');
      })
      .catch((err) => handleWarning(err.message));
  };

  // Pega todos os usuários para o componente Userlist
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_HOSTNAME}/admin/users`,
        {
          headers: {
            Authorization: token,
          },
        },
        {
          mode: 'no-cors',
        },
      )
      .then((response) => setUsers(response.data))
      .catch((err) => handleWarning(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      { warning && <WarningBox content={ warning } /> }
      <AdminAddUser
        handleSubmit={ handleSubmit }
      />
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <AdminUserList token={ token } users={ users } />
      )}
    </Layout>
  );
}
