import * as React from 'react';
import { BackTop, Table } from 'antd';
import './index.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { setFont } from 'helpers';
import { WeekData } from './models';
import expandedRow from './ExpandedRow';
import ColumnVisibility from '../../ColumsVisibility';
import { getCurrentWeek } from './EditableCell/getOriginData';

const TableSchedule: React.FC = () => {
  const events = useSelector((state: RootState) => state.events.data);
  const currentVersion = useSelector(
    (state: RootState) => state.settings.visual,
  );
  const font = setFont(currentVersion);
  const classForHead = font.fontSize === '16px' ? font.fontSize : '14px';
  const currentWeek = getCurrentWeek(events);
  const ref = useRef<HTMLHeadingElement>(null);

  const useWindowSize = () => {
    const [width, setWidth] = useState(0);
    useLayoutEffect(() => {
      function updateSize() {
        setWidth(window.innerWidth);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return width;
  };

  const windowSize = useWindowSize();

  let weekAmount = 0;
  events.forEach((event) => {
    if (+event.week > weekAmount) weekAmount = +event.week;
  });

  const data: WeekData[] = [];
  for (let i = 0; i <= 50; ++i) {
    data.push({
      key: i,
      name: `Week ${i}`,
      weekData: expandedRow(i, windowSize),
    });
  }

  const columns = [
    {
      title: 'RS School Schedule',
      dataIndex: 'name',
      key: 'name',
      className: `font-size-${classForHead}`,
    },
    {
      title: <ColumnVisibility />,
      dataIndex: 'test',
      key: 'name',
      className: `column-visibility font-size-${classForHead}`,
      style: { padding: windowSize > 400 ? '0 15px 0 0' : 'inherit' },
    },
  ];

  useEffect(() => {
    window.scrollTo(0, ref?.current?.getBoundingClientRect().top);
  }, []);

  return (
    <>
      <BackTop />
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
          if (index < currentWeek)
            return `pastWeek  font-size-${font.fontSize}`;
          if (index === currentWeek)
            return `currentWeek  font-size-${font.fontSize}`;
          if (index > weekAmount)
            return `disabledWeek  font-size-${font.fontSize}`;
          return `font-size-${font.fontSize}`;
        }}
        scroll={{ y: 10000 }}
      />
    </>
  );
};

export default TableSchedule;
