import './index.scss';
import * as React from 'react';
import { Modal } from 'antd';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { closeEventPage } from 'reducers/eventId';
import EventMap from 'components/EventMap';
import MentorMode from './MentorMode';
import StudentMode from './StudentMode';
import TaskSelector from './TaskSelector';

const TaskDescription: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.events.loading);
  const dispatch = useDispatch();
  const eventId = useSelector((state: RootState) => state.eventId.eventId);
  const isOpen = useSelector((state: RootState) => state.eventId.isOpen);
  const events = useSelector((state: RootState) => state.events.data);
  const changedInd = events.findIndex((event) => event.id === eventId);
  const role = useSelector((state: RootState) => state.role.currentRole);
  const details = useSelector(
    (state: RootState) => state.events.data[changedInd].details,
  );
  const { address, description } = events[changedInd];

  if (isLoading) {
    return <p>loading...</p>;
  }

  // console.log(address);

  return (
    <Modal
      title={events[changedInd].name}
      visible={isOpen}
      onOk={() => dispatch(closeEventPage())}
      onCancel={() => dispatch(closeEventPage())}
      width={1000}
      keyboard
      footer={null}
      zIndex={7}
    >
      <div className="task-description-wrapper">
        {role === 'Mentor' ? <MentorMode /> : <StudentMode />}
      </div>
      {/* {address && <EventMap address={address} />} */}
    </Modal>
  );
};

export default TaskDescription;
