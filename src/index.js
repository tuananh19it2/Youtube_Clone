import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './base.scss';
import { Provider } from 'react-redux';


import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
          <App />
       </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );
}

renderApp();

