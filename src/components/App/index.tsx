import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from 'components/Header';
import Tabs from 'components/Tabs';
import Footer from 'components/Footer';

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
      <Tabs />
      <Footer />
    </>
  );
};

export default App;
