import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from 'components/App';
import store from 'store';
import { BrowserRouter as Router } from 'react-router-dom';

import './styles/index.scss';

const Index: React.FC = () => (
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);

render(<Index />, document.getElementById('root'));
