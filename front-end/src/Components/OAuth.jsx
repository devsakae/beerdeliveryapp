import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import '../pages/Login.css';

export default function OAuth() {
  return (
    <button
      type="button"
      className='googlebtn'
      disabled
    >
      <FcGoogle /> Conta Google
    </button>
  )
}
