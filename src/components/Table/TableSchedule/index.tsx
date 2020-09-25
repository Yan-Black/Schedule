import * as React from 'react';
import { Table } from 'antd';
import './index.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useEffect, useRef } from 'react';
import { WeekData } from './models';
import expandedRow from './ExpandedRow';
import ColumnVisibility from '../../ColumsVisibility';
import { getCurrentWeek } from './EditableCell/getOriginData';

const TableSchedule: React.FC = () => {
  const events = useSelector((state: RootState) => state.events.data);
  const currentWeek = getCurrentWeek(events);
  const ref = useRef<HTMLHeadingElement>(null);

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

  useEffect(() => {
    window.scrollTo(0, ref?.current?.getBoundingClientRect().top);
  }, [data]);

  return (
    <Table<WeekData>
      columns={columns}
      expandable={{
        expandedRowRender: (record) => {
          return (
            <>
              <h5 ref={ref}>{null}</h5>
              {record.weekData}
            </>
          );
        },
      }}
      defaultExpandedRowKeys={[currentWeek]}
      dataSource={data}
      pagination={false}
      rowClassName={(record, index) => {
        if (index < currentWeek) return 'pastWeek';
        if (index === currentWeek) return 'currentWeek';
        if (index > weekAmount) return 'disabledWeek';
        return null;
      }}
      scroll={{ y: 5000 }}
    />
  );
};

export default TableSchedule;
