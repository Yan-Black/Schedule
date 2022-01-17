import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from 'components/App';
import store from 'store';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from 'errorBoundary/errorBoundary';

import './styles/index.scss';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').then(function (registration) {
          console.log('Service worker successfully registered on scope', registration.scope);
      }).catch(function (error) {
          console.log('Service worker failed to register');
      });
  });
}

const Index: React.FC = () => (
  <Router>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </Router>
);

render(<Index />, document.getElementById('root'));


