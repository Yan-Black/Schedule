import * as React from 'react';
import { Table, Skeleton } from 'antd';
import './index.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { WeekData } from './models';
import expandedRow from './ExpandedRow';
import ColumnVisibility from '../../ColumsVisibility';

const TableSchedule: React.FC = () => {
  const events = useSelector((state: RootState) => state.events.data);
  let weekAmount = 0;
  events.forEach((event) => {
    if (+event.week > weekAmount) weekAmount = +event.week;
  });
  const data: WeekData[] = [];
  for (let i = 0; i < 50; ++i) {
    data.push({
      key: i,
      name: `Week ${i}`,
      weekData: expandedRow(i),
    });
  }

  const columns = [
    {
      title: 'RS School Schedule',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <ColumnVisibility />,
      dataIndex: 'test',
      key: 'name',
      className: 'column-visibility',
    },
  ];

  return (
    <Table<WeekData>
      columns={columns}
      expandable={{
        expandedRowRender: (record) => record.weekData,
      }}
      defaultExpandedRowKeys={[1]}
      dataSource={data}
      pagination={false}
      // expandedRowClassName={() => 'currentWeek1'}
      // rowClassName={(record, index) => `currentWeek${index}`}
      rowClassName={(record, index) => {
        if(index < 1) return 'pastWeek';
        if(index === 1) return 'currentWeek';
        if(index > weekAmount) return 'disabledWeek';
        return null;
      }}
      scroll={{ y: 500 }}
    />
  );
};

export default TableSchedule;
