import React from 'react';

export default function AdminUserListItem({ user }) {
  return (
    <tr>
      <td>{ user.id }</td>
      <td>{ user.name }</td>
      <td>{ user.email }</td>
      <td>{ user.role }</td>
    </tr>
  );
}
