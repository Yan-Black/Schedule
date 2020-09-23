import { noType } from '@constants/_tableConstants';
import { Button } from 'antd';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { StudyEvent } from 'reducers/events/models';
import { postEvent } from 'requests';
import { midnight } from '../EditableCell/getOriginData';
import { AddButtonProps } from '../models';

const AddButton = ({
  sortedData,
  events,
  ind,
}: AddButtonProps): JSX.Element => {
  const dispatch = useDispatch();
  const add = () => {
    const newItem: StudyEvent = {
      dateTime:
        sortedData.length > 0
          ? sortedData[0].startDay
          : events[events.length - 1].dateTime,
      eventTime: midnight,
      type: noType,
      week: sortedData.length > 0 ? sortedData[0].week : ind.toString(),
    };
    dispatch(postEvent(newItem));
  };

  return (
    <Button type="primary" onClick={add}>
      Add event
    </Button>
  );
};

export default AddButton;
