import * as React from 'react';
import { Timeline, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { setEventPageId } from 'reducers/eventId';
import { eventTypes, listMarkerColors } from '@constants';
import { getKeyByValue } from 'helpers';
import { ItemProps } from '../models';

const ListRow: React.FC<ItemProps> = ({
  eventId,
  name,
  type,
  time,
  desc,
}: ItemProps) => {
  const dispatch = useDispatch();
  const clickHandler = () => dispatch(setEventPageId(eventId));
  const { Item } = Timeline;

  return (
    <Item color={listMarkerColors[getKeyByValue(eventTypes, type)] as string}>
      <span>{time}</span>{' '}
      <button type="button" className="list__button" onClick={clickHandler}>
        <Tooltip title={type}>
          <span>{desc || name}</span>
        </Tooltip>
      </button>
    </Item>
  );
};

export default ListRow;
