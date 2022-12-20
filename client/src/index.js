import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {Provider} from 'react-redux';
import {HelmetProvider} from 'react-helmet-async';
import {getStore, initStore} from "./store";
import setupInterceptors from "./http/services/setupInterceptors";

initStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={getStore()}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);

setupInterceptors();
