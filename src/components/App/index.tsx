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
import TaskDescription from 'components/TaskDescription';

const App: React.FC = () => {
  const isOpen = useSelector((state: RootState) => state.eventId.isOpen);
  const dispatch = useDispatch();
  const settings =
    (JSON.parse(localStorage.getItem('settings')) as Settings) || null;
  const {
    events: { data },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (settings) {
      dispatch(updateEventsTime(utcOffsets[settings.time]));
    }
  }, [data]);

  useEffect(() => {
    dispatch(fetchStudyEvents());
    dispatch(fetchOrganizres());
  }, []);

  return (
    <>
      <Header />
      <Switch>
        {isOpen && <TaskDescription />}
        <Tabs />
      </Switch>
      <Footer />
      <ModalWindow />
    </>
  );
};

export default App;
