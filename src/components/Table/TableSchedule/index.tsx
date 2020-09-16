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
  for (let i = 0; i < 5; ++i) {
    data.push({
      key: i,
      name: `Week ${i}`,
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
