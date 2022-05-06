import React from 'react';
import ReactDOM from 'react-dom';
import './firebase/initialize';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);