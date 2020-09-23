import './index.scss';
import * as React from 'react';
import { Select, Modal } from 'antd';
import { taskTypes } from '@constants';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { setTaskType, closeEventPage } from 'reducers/eventId';
import StandartTask from './StandartTask';
import Codewars from './Codewars';
import Meetup from './Meetup';
import Interview from './Interview';
import CoreJS from './CoreJS';
import MentorMode from './Codewars/MentorMode';
import StudentMode from './Codewars/StudentMode';

const { Option } = Select;

const TaskDescription: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.events.loading);
  const dispatch = useDispatch();
  const taskType = useSelector((state: RootState) => state.eventId.taskType);
  const eventId = useSelector((state: RootState) => state.eventId.eventId);
  const isOpen = useSelector((state: RootState) => state.eventId.isOpen);
  const events = useSelector((state: RootState) => state.events.data);
  const changedInd = events.findIndex((event) => event.id === eventId);
  const role = useSelector((state: RootState) => state.role.currentRole);

  // const {
  //   events: { data },
  // } = useSelector((state: RootState) => state);

  const handleChange = (value: string) => dispatch(setTaskType(value));

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <Modal
        title={events[changedInd].name}
        visible={isOpen}
        onOk={() => dispatch(closeEventPage())}
        onCancel={() => dispatch(closeEventPage())}
        width={1000}
        keyboard
        footer={null}
      >
        <div className="task-description-wrapper">
          <h3 className="task-main-headline">
            Выберите тип задания:
            <Select
              className="select-task"
              defaultValue="Task"
              style={{ width: 140 }}
              onChange={handleChange}
            >
              {Object.entries(taskTypes).map((item: string[]) => {
                const [key, value] = item;
                return (
                  <Option key={key} value={key}>
                    {value}
                  </Option>
                );
              })}
            </Select>
          </h3>
          {
            {
              codewars: role === 'Mentor' ? <MentorMode /> : <StudentMode />,
              meetup: <Meetup />,
              standartTask: <StandartTask />,
              interview: <Interview />,
              coreJS: <CoreJS />,
            }[taskType]
          }
        </div>
      </Modal>
    </>
  );
};

export default TaskDescription;
