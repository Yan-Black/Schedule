import * as React from 'react';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { taskTypes } from '@constants';
import { RootState } from 'store';
import { changeEvent } from 'reducers/events';

const { Option } = Select;

const StudentMode: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.events.loading);
  const dispatch = useDispatch();
  const eventId = useSelector((state: RootState) => state.eventId.eventId);
  const events = useSelector((state: RootState) => state.events.data);
  const changedInd = events.findIndex((event) => event.id === eventId);
  const details = useSelector(
    (state: RootState) => state.events.data[changedInd].details,
  );
  const changed = events.find((event) => event.id === eventId);

  const additionalDetails = {
    taskType: details ? details.taskType : '',
  };
  const changedEvent = {
    ...changed,
    details: additionalDetails,
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

  const setTaskType = (value: string) => {
    additionalDetails.taskType = value;
    dispatch(changeEvent({ changedEvent, changedInd }));
  };

  return (
    <>
      <h3 className="task-main-headline">
        Выберите тип задания:
        <Select
          className="select-task"
          defaultValue={details ? details.taskType : 'Task'}
          style={{ width: 140 }}
          onChange={setTaskType}
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
    </>
  );
};

export default StudentMode;
