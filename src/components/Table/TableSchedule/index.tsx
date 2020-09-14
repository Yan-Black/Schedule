import * as React from 'react';
import { Table } from 'antd';
import './index.scss';
import { ScheduleData } from './models';
import expandedRow from './ExpandedRow';

const TableSchedule: React.FC = () => {
  const expandedRowRender = expandedRow;
  const columns = [
    {
      title: 'RS School Schedule',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const data: ScheduleData[] = [];

  const millisecondsInWeek = 604800000;

  for (let i = 0; i < 25; ++i) {
    const currDate = new Date(Date.now() + millisecondsInWeek * i);
    const currDay = currDate.getDate();
    const currMonth = currDate.getMonth();
    const currYear = currDate.getFullYear();
    const nextDate = new Date(Date.now() + millisecondsInWeek * i + millisecondsInWeek);
    const nextDay = nextDate.getDate();
    const nextMonth = nextDate.getMonth();
    const nextYear = nextDate.getFullYear();
    data.push({
      key: i,
      name: `Week ${i + 1}
            (${currDay}.${currMonth}.${currYear}
            - ${nextDay}.${nextMonth}.${nextYear})`,
    });
  }

  return (
    <Table<ScheduleData>
      className="components-table-demo-nested"
      columns={columns}
      expandable={{ expandedRowRender }}
      defaultExpandedRowKeys={[2]}
      dataSource={data}
      pagination={false}
      rowClassName={(record, index) => `currentWeek${index}`}
      scroll={{ y: 500 }}
    />
  );
};

export default TableSchedule;
