import * as React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import './index.scss';
import { RootState } from 'store';
import { WeekData } from './models';
import expandedRow from './ExpandedRow';
import ColumnVisibility from '../../ColumsVisibility';

const TableSchedule: React.FC = () => {
  const currentVisual = useSelector(
    (state: RootState) => state.settings.visual,
  );
  const visual = currentVisual ? 'week__visual-size' : '';

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
      rowClassName={(record, index) => `${visual} currentWeek${index}`}
      scroll={{ y: 500 }}
    />
  );
};

export default TableSchedule;
