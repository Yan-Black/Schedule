import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Header from 'components/Header';
import Table from 'components/Table';
import Calendar from 'components/Calendar';
import List from 'components/List';
import Footer from 'components/Footer';

import fetchStudyEvents, { fetchOrganizres } from 'requests';
import Customization from '../Customization';

import './index.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudyEvents());
    dispatch(fetchOrganizres());
  }, []);

  return (
    <>
      <Header />
      <Customization />
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
