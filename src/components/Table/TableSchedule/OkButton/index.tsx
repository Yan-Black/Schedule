import { CheckSquareTwoTone } from '@ant-design/icons';
import { errorHandler, utcOffsets } from '@constants';
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
  const zoneName = useSelector((state: RootState) => state.settings.time);
  const timeZone = utcOffsets[zoneName];

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
      let date: Date;
      let dateTime: string;
      if (row.date) {
        date = row.date.toDate();
        const dateDate = date.getDate();
        const dateMonth =
          (date.getMonth() + 1).toString().length < 2
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1;
        const dateYear = date.getFullYear();
        const dayOfWeek: string = row.date.toDate().toString().slice(0, 3);
        dateTime = `${dayOfWeek}, ${dateDate}.${dateMonth}.${dateYear}`;
      }

      const hours =
        row.time.toDate().getHours().toString().length < 2
          ? `0${row.time.toDate().getHours()}`
          : row.time.toDate().getHours();
      const minutes =
        row.time.toDate().getMinutes().toString().length < 2
          ? `0${row.time.toDate().getMinutes()}`
          : row.time.toDate().getMinutes();

      const eventTime = row.time ? `${hours}:${minutes}` : changed.eventTime;

      const changedEvent = {
        ...changed,
        name: row.name || changed.name,
        place: row.place || changed.place,
        organizerId,
        comment: row.comments || changed.comment,
        dateTime: dateTime || changed.dateTime,
        week: row.week.toString() || changed.week,
        eventTime,
        timeZone: timeZone || changed.timeZone,
        description: row.description || changed.description,
        descriptionUrl: row.materials || changed.descriptionUrl,
        type: row.type || changed.type,
        additional1: row.additional1 || changed.additional1 || '',
        additional2: row.additional2 || changed.additional2 || '',
        additional3: row.additional3 || changed.additional3 || '',
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
