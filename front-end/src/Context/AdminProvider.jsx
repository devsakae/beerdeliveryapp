import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { getFromLocalStorage } from '../services/localStorage';
import AdminContext from './AdminContext';

export default function AdminProvider({ children }) {
  const [userLogged, setUserLogged] = useState('');

  useEffect(() => {
    const userData = getFromLocalStorage('user');
    setUserLogged(userData);
  }, []);

  const context = useMemo(() => ({
    userLogged,
  }), [userLogged]);

  return (
    <AdminContext.Provider value={ context }>
      { children }
    </AdminContext.Provider>
  );
}

AdminProvider.propTypes = {
  children: PropTypes.node,
}.isrequired;
