import * as React from 'react';
import { Card, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { setEventPageId } from 'reducers/eventId';
import { ItemProps } from '../models';

const Item: React.FC<ItemProps> = ({
  eventId,
  name,
  type,
  time,
}: ItemProps) => {
  const dispatch = useDispatch();
  const clickHandler = () => dispatch(setEventPageId(eventId));

  return (
    <Card title={name}>
      <h2>{type}</h2>
      <p>{`Time: ${time || '00:00:00'}`}</p>
      <Button onClick={clickHandler}>Description</Button>
    </Card>
  );
};

export default Item;
