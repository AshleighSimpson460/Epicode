import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Day2exercise from './bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataJSON from './json';
import Jumbo from './jumbotron';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Day2exercise />
  </React.StrictMode>
);

const JumbotronDiv = ReactDOM.createRoot(document.getElementById('JumbotronDiv'));
JumbotronDiv.render(
  <React.StrictMode>
    <Jumbo />
  </React.StrictMode>
);

const jsonBody = ReactDOM.createRoot(document.getElementById('jsonBody'));
jsonBody.render(
  <React.StrictMode>
    <DataJSON />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
