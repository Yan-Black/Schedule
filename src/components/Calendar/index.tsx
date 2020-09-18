import * as React from 'react';
import { Calendar as CalendarWrapper, Badge } from 'antd';
import { useSelector } from 'react-redux';

import { RootState } from 'store';
import { StudyEvent } from 'reducers/events/models';
import { eventTypes } from '@constants';
import { getKeyByValue } from 'helpers';
import { ListData } from './models';

import './index.scss';

const Calendar: React.FC = () => {
  const events = useSelector((state: RootState) => state.events.data);
  const { colors } = useSelector((state: RootState) => state);

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

    return (
      <ul className="events">
        {listData.map((item) => (
          <li
            key={item.content}
            className={
              colors[getKeyByValue(eventTypes, item.typeColor)] as string
            }
          >
            <Badge
              status={item.type}
              text={`${item.eventTime} ${item.content}`}
            />
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
    return (
      <ul className="events">
        {listData.map((item) => (
          <li
            key={item.id}
            className={
              colors[getKeyByValue(eventTypes, item.typeColor)] as string
            }
          >
            <Badge
              status={item.type}
              text={`${item.eventTime} ${item.content}`}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <CalendarWrapper
      className="container"
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  );
};

export default Calendar;
