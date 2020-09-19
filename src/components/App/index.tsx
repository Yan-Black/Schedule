import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
<<<<<<< HEAD
import { Switch } from 'react-router-dom';
import Header from 'components/Header';
import Tabs from 'components/Tabs';
import Footer from 'components/Footer';
=======
import Header from 'components/Header';
import Tabs from 'components/Tabs';
import Footer from 'components/Footer';
import ModalWindow from 'components/Modal';
>>>>>>> b060985... feat: add modal window call
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
        <Tabs />
      </Switch>
      <Footer />
<<<<<<< HEAD
=======
      <ModalWindow />
>>>>>>> b060985... feat: add modal window call
    </>
  );
};

export default App;
