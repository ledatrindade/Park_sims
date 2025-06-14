import React from 'react';
import ReactDOM from 'react-dom/client'; // Usando o React 18+
import App from './App';
import './index.css'; // Certifique-se de que você tenha esse arquivo, ou substitua se necessário

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
