import React from 'react';
import beerhomelogo from '../images/beerhomelogo.jpeg';

export default function LayoutRoot({ children }) {
  return (
    <div className="homepage">
      <div className='logobox'><img src={ beerhomelogo } /></div>
      { children }
    </div>
  )
}
