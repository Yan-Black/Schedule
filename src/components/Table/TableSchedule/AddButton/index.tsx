import { noType } from '@constants/_tableConstants';
import { Button } from 'antd';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StudyEvent } from 'reducers/events/models';
import { postEvent } from 'requests';
import { RootState } from 'store';
import { midnight } from '../EditableCell/getOriginData';
import { AddButtonProps } from '../models';

const AddButton = ({
  sortedData,
  events,
  ind,
}: AddButtonProps): JSX.Element => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.events.idLoading);

  const add = () => {
    const newItem: StudyEvent = {
      dateTime:
        sortedData.length > 0
          ? sortedData[0].startDay
          : events[events.length - 1].dateTime,
      eventTime: midnight,
      type: noType,
      week: sortedData.length > 0 ? sortedData[0].week : ind.toString(),
      // to do: here we can set time zone also, time zone is taking from settings
    };
    dispatch(postEvent(newItem));
  };

  return (
    <Button type="primary" onClick={add} loading={loading}>
      Add event
    </Button>
  );
};

export default AddButton;
