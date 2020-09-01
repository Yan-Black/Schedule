import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from 'components/App';
import store from 'store';

const Index: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

render(<Index />, document.getElementById('root'));
