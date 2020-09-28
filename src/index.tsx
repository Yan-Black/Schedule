import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from 'components/App';
import store from 'store';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from 'errorBoundary/errorBoundary';

import './styles/index.scss';

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
