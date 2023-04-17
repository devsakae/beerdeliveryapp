import React from 'react';
import './Warning.css';

export default function WarningBox({ content }) {
  return (
    <div className="warningbox">{ content }</div>
  );
}
