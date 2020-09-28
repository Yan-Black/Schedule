import './index.scss';
import * as React from 'react';
import axios from 'utils';
import { Modal } from 'antd';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { closeEventPage } from 'reducers/eventId';
import EventMap from 'components/EventMap';
import { HeartTwoTone } from '@ant-design/icons';
import { changeEvent } from 'reducers/events';
import { putEventUrl } from '@constants/api';
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

  const heartColor = events[changedInd].favourite ? 'red' : 'blue';

  if (isLoading) {
    return <p>loading...</p>;
  }

  const handleFavourite = async () => {
    const favEvent = {
      ...events[changedInd],
      favourite: !events[changedInd].favourite,
    };

    await axios.put(putEventUrl(events[changedInd].id), favEvent);
    dispatch(changeEvent({ changedEvent: favEvent, changedInd }));
  };

  return (
    <>
      <Modal
        title={
          <>
            <span>{events[changedInd].name}</span>&nbsp;
            <button
              type="button"
              className="task-favourite"
              style={{ cursor: 'pointer' }}
              onClick={handleFavourite}
            >
              <HeartTwoTone twoToneColor={heartColor} />
            </button>
          </>
        }
        visible={isOpen}
        onOk={() => dispatch(closeEventPage())}
        onCancel={() => dispatch(closeEventPage())}
        width={1000}
        keyboard
        footer={null}
        zIndex={7}
      >
        <div className="task-description-wrapper">
          {role === 'Mentor' ? <TaskSelector /> : ''}
          {
            {
              codewars: role === 'Mentor' ? <MentorMode /> : <StudentMode />,
              meetup: role === 'Mentor' ? <MentorMode /> : <StudentMode />,
              standartTask:
                role === 'Mentor' ? <MentorMode /> : <StudentMode />, // change component
              interview: role === 'Mentor' ? <MentorMode /> : <StudentMode />,
              coreJS: role === 'Mentor' ? <MentorMode /> : <StudentMode />,
            }[details ? details.taskType : '']
          }
          <div>
            {description}
            <p style={{ textAlign: 'justify', textIndent: '20px' }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam
              officia unde perspiciatis corrupti odio maxime quisquam, vel
              eligendi facilis nostrum quas nulla ratione aspernatur amet iusto
              neque atque eaque ut quam explicabo pariatur et perferendis. Ipsam
              vitae modi veniam quia neque sequi ullam a aspernatur soluta
              perferendis delectus deleniti, voluptate enim magni quae suscipit
              commodi unde sunt iusto culpa accusantium distinctio officia
              sapiente! Ex vero itaque, nulla eum qui natus repellendus unde
              quae harum quasi excepturi placeat ipsum aliquid eligendi quis ab,
              repellat corrupti officiis deleniti, molestias porro! Delectus
              eius ipsum ipsa deserunt quia quis fuga impedit eaque. Commodi,
              earum?
            </p>
          </div>
          {address && <EventMap address={address} />}
        </div>
      </Modal>
    </>
  );
};

export default TaskDescription;
