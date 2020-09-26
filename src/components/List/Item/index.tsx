import * as React from 'react';
import { Card, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setEventPageId } from 'reducers/eventId';
import { setFont } from 'helpers';
import { RootState } from 'store';
import { ItemProps } from '../models';

const Item: React.FC<ItemProps> = ({
  eventId,
  name,
  type,
  time,
}: ItemProps) => {
  const dispatch = useDispatch();
  const clickHandler = () => dispatch(setEventPageId(eventId));
  const currentVisual = useSelector(
    (state: RootState) => state.settings.visual,
  );
  const font = setFont(currentVisual);

  return (
    <Card title={name}>
      <h2>{type}</h2>
      <p style={font}>{`Time: ${time || '00:00:00'}`}</p>
      <Button onClick={clickHandler} style={font}>
        Description
      </Button>
    </Card>
  );
};

export default Item;
