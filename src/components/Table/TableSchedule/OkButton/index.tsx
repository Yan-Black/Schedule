import { CheckSquareTwoTone } from '@ant-design/icons';
import { errorHandler } from '@constants';
import { putEventUrl } from '@constants/api';
import { Tooltip, Button } from 'antd';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeEvent } from 'reducers/events';
import { RootState } from 'store';
import axios from 'utils';
import { FormFields, OkButtonProps } from '../models';

const OkButton = ({
  recordKey,
  form,
  setEditingKey,
  setIsLoad,
  sortedData,
  organizers,
}: OkButtonProps): JSX.Element => {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events.data);

  const save = async (key: React.Key) => {
    try {
      setIsLoad(true);
      const row: FormFields = await form.validateFields();
      const newData = sortedData.slice();
      const index = newData.findIndex((item) => key === item.key);
      const changed = events.find((event) => event.id === newData[index].id);
      const changedInd = events.findIndex(
        (event) => event.id === newData[index].id,
      );

      const organizerId =
        !row.lector || row.lector === 'no lector'
          ? ''
          : organizers.find((lector) => lector.name === row.lector).id;

      const date = row.date.toDate();
      const dateString: string = date.toLocaleDateString();
      const dayOfWeek: string = row.date.toDate().toString().slice(0, 3);
      const dateTime = `${dayOfWeek}, ${dateString}`;
      const eventTime = row.time.toDate().toLocaleTimeString().slice(0, 5);

      const changedEvent = {
        ...changed,
        name: row.name,
        place: row.place,
        organizerId,
        comment: row.comments,
        dateTime,
        week: row.week.toString(),
        eventTime,
        description: row.description,
        descriptionUrl: row.materials,
        type: row.type,
        additional1: row.additional1,
        additional2: row.additional2,
        additional3: row.additional3,
      };

      await axios.put(putEventUrl(events[changedInd].id), changedEvent);
      dispatch(changeEvent({ changedEvent, changedInd }));
    } catch (errInfo) {
      errorHandler();
    } finally {
      setIsLoad(false);
      setEditingKey('');
    }
  };

  return (
    <Tooltip title="Save">
      <Button icon={<CheckSquareTwoTone />} onClick={() => save(recordKey)} />
    </Tooltip>
  );
};

export default OkButton;
