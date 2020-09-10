import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Header from 'components/Header';
import Table from 'components/Table';
import Calendar from 'components/Calendar';
import List from 'components/List';
import Footer from 'components/Footer';
import Map from 'components/Map';

import fetchStudyEvents, { fetchOrganizres } from 'requests';

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
      <Switch>
        <Route exact path="/" component={Table} />
        <Route path="/calendar" component={Calendar} />
        {/* <Route path="/list" component={List} /> */}
        <Route path="/list" component={Map} />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
