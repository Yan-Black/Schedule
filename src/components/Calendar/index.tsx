import * as React from 'react';
import { Calendar as CalendarWrapper, Badge, Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store';
import { StudyEvent } from 'reducers/events/models';
import { eventTypes } from '@constants';
import { getKeyByValue, setFont } from 'helpers';
import useWindowSize from 'hooks';
import { setEventPageId } from 'reducers/eventId';
import { ListData } from './models';

import './index.scss';

const Calendar: React.FC = () => {
  const events = useSelector((state: RootState) => state.events.data);
  const { colors } = useSelector((state: RootState) => state);
  const isLoading = useSelector((state: RootState) => state.events.loading);
  const currentVersion = useSelector(
    (state: RootState) => state.settings.visual,
  );
  const size = useWindowSize();

  if (isLoading) {
    return <Skeleton active />;
  }

  const getListData = (value: moment.Moment) => {
    let listData: ListData[] = [];
    let point: ListData['type'];
    const types = Object.values(eventTypes);

    const name = (item: StudyEvent) => {
      for (let i = 0; i < types.length; i++) {
        switch (item.type) {
          case 'Task deadline':
          case 'Optional task deadline':
          case 'Cross-check deadline':
            point = 'error';
            break;
          case 'Online lecture':
          case 'Meetup':
            point = 'warning';
            break;
          case 'Optional task start':
          case 'Self education':
            point = 'processing';
            break;
          case 'Cross-check start':
          case 'Task start':
            point = 'success';
            break;
          case 'Test with grade':
          case 'Test without grade':
          case 'Interview start':
            point = 'warning';
            break;
          default:
            point = 'default';
        }
      }
      if (
        value.date() === Number(item.dateTime.split(' ')[1].split('.')[0]) &&
        value.month() ===
          Number(item.dateTime.split(' ')[1].split('.')[1]) - 1 &&
        value.year() === Number(item.dateTime.split(' ')[1].split('.')[2])
      ) {
        listData = [
          {
            type: point,
            content: item.name,
            eventTime: item.eventTime,
            typeColor: item.type,
            id: item.id,
          },
        ];
      }
    };
    events.map(name);

    return listData || [];
  };

  const dateCellRender = (value: moment.Moment) => {
    const listData = getListData(value);
    const font = setFont(currentVersion);
    const dispatch = useDispatch();

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content} style={font}>
            <button
              className={
                colors[getKeyByValue(eventTypes, item.typeColor)] as string
              }
              type="button"
              onClick={() => dispatch(setEventPageId(item.id))}
            >
              <Badge status={item.type} style={font} />
              {`${item.eventTime} ${item.content}`}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  const getMonthData = (value: moment.Moment) => {
    let listData: ListData[] = [];
    let point: ListData['type'];
    const types = Object.values(eventTypes);

    const item = (li: StudyEvent): ListData => {
      for (let i = 0; i < types.length; i++) {
        switch (li.type) {
          case 'Task deadline':
          case 'Optional task deadline':
          case 'Cross-check deadline':
            point = 'error';
            break;
          case 'Online lecture':
          case 'Meetup':
            point = 'warning';
            break;
          case 'Optional task start':
          case 'Self education':
            point = 'processing';
            break;
          case 'Cross-check start':
          case 'Task start':
            point = 'success';
            break;
          case 'Test with grade':
          case 'Test without grade':
          case 'Interview start':
            point = 'warning';
            break;
          default:
            point = 'default';
        }
      }

      if (
        value.month() ===
        Number(li.dateTime.split(' ')[1].split('.')[1]) - 1
      ) {
        return {
          type: point,
          content: li.name,
          eventTime: li.eventTime,
          typeColor: li.type,
          id: li.id,
        };
      }

      return null;
    };
    listData = events.map(item).filter((elem) => !!elem);

    return listData || [];
  };

  const monthCellRender = (value: moment.Moment) => {
    const listData = getMonthData(value);
    const font = setFont(currentVersion);
    const dispatch = useDispatch();

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id} style={font}>
            <button
              type="button"
              className={
                colors[getKeyByValue(eventTypes, item.typeColor)] as string
              }
              onClick={() => dispatch(setEventPageId(item.id))}
            >
              <Badge style={font} status={item.type} />
              {`${item.eventTime} ${item.content}`}
            </button>
          </li>
        ))}
      </ul>
    );
  };
  const font = setFont(currentVersion);

  const styles: React.CSSProperties =
    size.width < 750 ? { ...font, overflowY: 'auto' } : font;

  return (
    <CalendarWrapper
      style={styles}
      className="container"
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  );
};

export default Calendar;
