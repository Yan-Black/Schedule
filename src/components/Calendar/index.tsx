import * as React from 'react';
import { Calendar as CalendarWrapper, Badge } from 'antd';
import { useSelector } from 'react-redux';

import { RootState } from 'store';
import { StudyEvent } from 'reducers/events/models';
import { getKeyByValue } from 'utils';
import { ListData } from './models';
import { eventTypes } from '../../constants/index';

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
        value.month() === Number(item.dateTime.split(' ')[1].split('.')[1]) - 1 &&
        value.year() === Number(item.dateTime.split(' ')[1].split('.')[2])
      ) {
        listData = [{ type: point, content: item.name, eventTime: item.eventTime, typeColor: item.type }];
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
          <li key={item.content} className={colors[getKeyByValue(eventTypes, item.typeColor)] as string}>
            <Badge status={item.type} text={`${item.eventTime} ${item.content}`} />
          </li>
        ))}
      </ul>
    );
  };

  // const getMonthData = (value) => {
  //   if (value.month() === 8) {
  //     return 1394;
  //   }
  //   return 1394;
  // };

  // const monthCellRender = (value) => {
  //   const num = getMonthData(value);
  //   return num ? (
  //     <div className="notes-month">
  //       <section>{num}</section>
  //       <span>Backlog number</span>
  //     </div>
  //   ) : null;
  // };

  return (
    <CalendarWrapper
      className="container"
      dateCellRender={dateCellRender}
      // monthCellRender={monthCellRender}
    />
  );
};

export default Calendar;
