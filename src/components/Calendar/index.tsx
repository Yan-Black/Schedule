import * as React from 'react';
import { Calendar, Badge } from 'antd';
import moment from 'moment';

import './index.scss';

const CalendarComponent: React.FC = () => {
  const getListData = (value) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'Songbird' },
          { type: 'success', content: 'Lection React' },
        ];
        break;
      case 18:
        listData = [
          { type: 'warning', content: 'Teat JS Core' },
          { type: 'success', content: 'Weather' },
          { type: 'error', content: 'Presentation' },
          { type: 'error', content: 'Codewars' },
          { type: 'error', content: 'English Puzzle' },
          { type: 'error', content: 'Interview' },
        ];
        break;
      default:
    }
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

  return <Calendar className="container" dateCellRender={dateCellRender} monthCellRender={monthCellRender} />;
};

export default CalendarComponent;
