import React, { useContext } from 'react';
import AdminContext from '../Context/AdminContext';

export default function AdminTest() {
  const { userLogged } = useContext(AdminContext);
  return (
    <div>
      Hello. User logged is:
      { userLogged.name }
    </div>
  );
}
