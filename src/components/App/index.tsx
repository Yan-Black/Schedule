import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import Header from 'components/Header';
import Tabs from 'components/Tabs';
import Footer from 'components/Footer';
import ModalWindow from 'components/ModalWindow';
import fetchStudyEvents, { fetchOrganizres } from 'requests';
import { updateEventsTime } from 'reducers/events';
import { utcOffsets } from '@constants';
import { Settings } from 'reducers/settings/models';
import { RootState } from 'store';
import './index.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { time } = JSON.parse(localStorage.getItem('settings')) as Settings;
  const {
    events: { data },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(updateEventsTime(utcOffsets[time]));
  }, [data]);

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
      <ModalWindow />
    </>
  );
};

export default App;
