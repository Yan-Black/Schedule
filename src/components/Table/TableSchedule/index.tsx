import * as React from 'react';
import { Table } from 'antd';
import './index.scss';
import { WeekData } from './models';
import expandedRow from './ExpandedRow';

const TableSchedule: React.FC = () => {
  const columns = [
    {
      title: 'RS School Schedule',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const data: WeekData[] = [];

  // const millisecondsInWeek = 604800000;

  for (let i = 0; i < 5; ++i) {
    // const currDate = new Date(Date.now() + millisecondsInWeek * i);
    // const currDay = currDate.getDate();
    // const currMonth = currDate.getMonth();
    // const currYear = currDate.getFullYear();
    // const nextDate = new Date(Date.now() + millisecondsInWeek * i + millisecondsInWeek);
    // const nextDay = nextDate.getDate();
    // const nextMonth = nextDate.getMonth();
    // const nextYear = nextDate.getFullYear();
    data.push({
      key: i,
      name: `Week ${i + 1}`,
      // (${currDay}.${currMonth}.${currYear}
      // - ${nextDay}.${nextMonth}.${nextYear})`,
      weekData: expandedRow(i),
    });
  }

  return (
    <Table<WeekData>
      columns={columns}
      expandable={{ expandedRowRender: (record) => record.weekData }}
      defaultExpandedRowKeys={[1]}
      dataSource={data}
      pagination={false}
      rowClassName={(record, index) => `currentWeek${index}`}
      scroll={{ y: 500 }}
    />
  );
};

export default TableSchedule;
