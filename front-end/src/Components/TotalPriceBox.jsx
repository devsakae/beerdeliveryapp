import React from 'react';
import './TotalPriceBox.css';

export default function TotalPriceBox({ children }) {
  return (
    <div className='pricebox'>
      { children }
    </div>
  )
}
