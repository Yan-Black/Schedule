import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Collapse, Skeleton, Timeline, Card, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { eventTypes } from '@constants';
import {
  generatePanelHader,
  sortDataByDate,
  getKeyByValue,
  currentDay,
} from 'helpers';
// import Item from './Item';
import './index.scss';
import { StudyEvent } from 'reducers/events/models';
import { setEventPageId } from 'reducers/eventId';

const { Panel } = Collapse;
const { Item } = Timeline;

const List: React.FC = () => {
  const dispatch = useDispatch();
  const {
    events: { data },
  } = useSelector((state: RootState) => state);
  const { colors } = useSelector((state: RootState) => state);
  const isLoading = useSelector((state: RootState) => state.events.loading);
  const ref = useRef<HTMLHeadingElement>(null);
  const clickHandler = (eId: string) => dispatch(setEventPageId(eId));

  const dataToApply = [...data].sort(sortDataByDate);

  const groupedData = Object.entries(
    dataToApply.reduce((wrap: { [x: string]: StudyEvent[] }, obj) => {
      wrap[obj.dateTime] = wrap[obj.dateTime] || ([] as StudyEvent[]);
      wrap[obj.dateTime].push(obj);
      return wrap;
    }, {}),
  );

  let currentIdx: number;

  if (dataToApply.length > 0) {
    dataToApply.forEach((obj) => {
      if (+obj.dateTime.slice(4, 7) >= currentDay) {
        currentIdx = dataToApply.indexOf(obj);
      }
    });
  }

  useEffect(() => {
    window.scrollTo(0, ref?.current?.getBoundingClientRect().top);
  });

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <Timeline>
      {groupedData.map(([dateTime, info], i) => (
        <Card
          title={generatePanelHader(currentIdx, dateTime, i, ref)}
          key={Math.random()}
        >
          {info.map(({ description, id }) => (
            <Item key={id} color="green">
              <button type="button" onClick={clickHandler.bind(null, id)}>
                {`${description}`}
              </button>
            </Item>
          ))}
        </Card>
      ))}
    </Timeline>
  );
};

export default List;
