import * as React from 'react';
import { Calendar as CalendarWrapper, Badge } from 'antd';
import { useSelector } from 'react-redux';

import { RootState } from 'store';
import { StudyEvent } from 'reducers/events/models';

import './index.scss';
import { ListData } from './models';

const CalendarComponent: React.FC = () => {
  const events = useSelector((state: RootState) => state.events.data);

  const getListData = (value: moment.Moment) => {
    let listData: ListData[];

    const name = (item: StudyEvent) => {
      const type = item.type === 'Self education' ? 'warning' : 'success';
      if (value.date() === Number(item.dateTime.split(' ')[1].split('.')[0])) {
        listData = [{ type, content: item.description }];
      }
    };
    events.map(name);

    return listData || [];
  };

  const dateCellRender = (value: moment.Moment) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(({ type, content }) => (
          <li key={content}>
            <Badge status={type} text={content} />
          </li>
        ))}
      </ul>
    );
  };

  const getMonthData = (value: moment.Moment) => {
    if (value.month() === 8) {
      return 1394;
    }
    return 1394;
  };

  const monthCellRender = (value: moment.Moment) => {
    const num = getMonthData(value);
    return (
      num && (
        <div className="notes-month">
          <section>{num}</section>
          <span>Backlog number</span>
        </div>
      )
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

export default CalendarComponent;
