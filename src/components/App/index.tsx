import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from 'components/Header';
import Table from 'components/Table';
import Calendar from 'components/Calendar';
import List from 'components/List';
import Footer from 'components/Footer';

import './index.scss';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Table} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/list" component={List} />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
