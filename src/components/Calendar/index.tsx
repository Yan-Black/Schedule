import * as React from 'react';
import { Calendar } from 'antd';

import './index.scss';

const CalendarComponent: React.FC = () => {
  const onPanelChange = (value, mode: never): void => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return <Calendar onPanelChange={onPanelChange} />;
};
export default CalendarComponent;
