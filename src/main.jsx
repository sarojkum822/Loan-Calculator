import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // or Main, etc.
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // make sure Tailwind is imported

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
