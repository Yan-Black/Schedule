import * as React from 'react';
import { Calendar as CalendarWrapper, Badge } from 'antd';
import { useSelector } from 'react-redux';

import { RootState } from 'store';

import './index.scss';

const CalendarComponent: React.FC = () => {
  const events = useSelector((state: RootState) => state.events.data);

  console.log(events);

  const getListData = (value) => {
    let listData;

    const name = (item) => {
      if (item.dateTime === 'string') {
        return;
      }
      if (value.date() === Number(item.dateTime.split(',')[1].slice(-2).trim())) {
        listData = [{ type: 'warning', content: item.name }];
      }
    };
    events.map(name);
    return listData || [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
    return 1394;
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  return <CalendarWrapper className="container" dateCellRender={dateCellRender} monthCellRender={monthCellRender} />;
};

export default CalendarComponent;
