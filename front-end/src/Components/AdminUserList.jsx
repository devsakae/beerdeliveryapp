import React from 'react';
import AdminUserListItem from './AdminUserListItem';
export default function AdminUserList({ error, users }) {
  return (
    <section>
      <div>
        { error && (<div>{ error }</div>) }
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome completo</th>
              <th>E-mail</th>
              <th>Posição</th>
            </tr>
          </thead>
          <tbody>
            { users?.map((user, i) => (<AdminUserListItem key={ i } user={ user } />)) }
          </tbody>
        </table>
      </div>
    </section>
  )
}
